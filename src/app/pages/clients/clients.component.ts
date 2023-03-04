import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatCell, MatTableDataSource} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';

export interface Client {
  id: string;
  name: any;
  cpf_cnpj: any;
  apartment: any;
  area: any;
  type: any;
  email: any;
  phone: any;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'cpf_cnpj', 'apartment', 'name', 'area', 'type', 'email', 'phone'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatSort) sort: MatSort | undefined;


  public clients: Client[] = [];

  constructor(  private sessionStorageService: SessionStorageService) {

    const users = Array.from({length: 15}, (_, k) => this.createNewUser(k + 1));
    this.clients = users;

    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngOnInit(): void {
    console.log(this.sessionStorageService.getSessionStorage('clients') )
    if(this.sessionStorageService.getSessionStorage('clients') != null) {
      this.clients = this.sessionStorageService.getSessionStorage('clients');
      this.dataSource = new MatTableDataSource(this.clients);
    }
  }

  ngAfterViewInit() {
    if(this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  public searchValue = '';

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch() {
    this.dataSource.filter = '';
    this.searchValue = '';
  }

  /** Builds and returns a new User. */
  createNewUser(id: number): Client {

    return {
      id: uuidv4(),
      cpf_cnpj: null,
      name: null,
      apartment: null,
      area: null,
      type: null,
      email: null,
      phone: null,

    };
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, (event.previousIndex+4), (event.currentIndex+4));
  }

  selection = new SelectionModel<Client>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }


  cpfChange(event: any, row: Client) {
    var numeric = event.target.value.replace(/[^0-9]+/g, '');
    var cpfLength = numeric.length;

    var partOne = numeric.slice(0, 3) + ".";
    var partTwo = numeric.slice(3, 6) + ".";
    var partThree = numeric.slice(6, 9) + "-";

    var cpfInput = '';//$w('#cpf');

    if (cpfLength < 4) {
        cpfInput = numeric;
    } else if (cpfLength >= 4 && cpfLength < 7) {
        var formatCPF = partOne +
		numeric.slice(3);
        cpfInput = formatCPF;
    } else if (cpfLength >= 7 && cpfLength < 10) {
        var formatCPF = partOne +
		partTwo +
		numeric.slice(6);
        cpfInput = formatCPF;
    } else if (cpfLength >= 10 && cpfLength < 12) {
        var formatCPF = partOne +
		partTwo +
		partThree +
		numeric.slice(9);
        cpfInput = formatCPF;
    } else if (cpfLength >= 12) {
        var formatCPF = partOne +
		partTwo +
		partThree +
		numeric.slice(9, 11);
        cpfInput = formatCPF;
    }

    row.cpf_cnpj = cpfInput;
}

  cnpjChange(event: any, row: Client) {
    var numeric = event.target.value.replace(/[^0-9]+/g, '');
    var cpfLength = numeric.length;

    var partOne = numeric.slice(0, 2) + ".";
    var partTwo = numeric.slice(2, 5) + ".";
    var partThree = numeric.slice(5, 8) + "/";
    var partFour = numeric.slice(8, 12) + "-"

    var cnpjInput = '';//document.getElementById('#cnpj');

    if (cpfLength < 3) {
      cnpjInput = numeric;
    }
    else if (cpfLength >= 3 && cpfLength < 6) {
      var formatCPF = partOne + numeric.slice(2);
      cnpjInput = formatCPF;
    }
    else if (cpfLength >= 6 && cpfLength < 9) {
      var formatCPF = partOne + partTwo + numeric.slice(5);
      cnpjInput = formatCPF;
    }
    else if (cpfLength >= 9 && cpfLength < 13) {
      var formatCPF = partOne + partTwo + partThree + numeric.slice(8);
      cnpjInput = formatCPF;
    }
    else if (cpfLength >= 13) {
      var formatCPF = partOne + partTwo + partThree + partFour + numeric.slice(12, 14);
      cnpjInput = formatCPF;
    }

    row.cpf_cnpj = cnpjInput;
  }

  publishChanges() {
    console.log("publishChanges", this.clients);
    if(this.validateClients() == true) {
      this.sessionStorageService.setSessionStorage('clients', this.clients)
    }
    else {
      this.hasErrors = true;
    }
  }

  public focuedID = '';

  focus(id: any) {
    this.focuedID = id;
  }

  onEnterPress(event: any, row: any, fieldName: any) {
    document.getElementById(row.id + fieldName)?.focus();
  }


  public hasErrors = false;

  validateClients() {
    for(let i=0; i<this.clients.length; i++) {
      const tempClient = this.clients[i];

      if(!((tempClient?.cpf_cnpj?.length == 14 || tempClient?.cpf_cnpj?.length == 18) && tempClient?.apartment?.trim().length > 0 && tempClient?.area > 0)) {
        setTimeout(() => {
          document.getElementById(tempClient.id)?.scrollIntoView({behavior: 'smooth'});
        }, 500);
        return false;
      }
    }
    return true;
  }

  addClient() {
    const newClient = {
      id: uuidv4(),
      cpf_cnpj: null,
      name: null,
      apartment: null,
      area: null,
      type: null,
      email: null,
      phone: null,
    };

    this.clients.push(newClient);

    this.dataSource = new MatTableDataSource(this.clients);

    if(this.sort) {
      this.dataSource.sort = this.sort;
    }

    setTimeout(() => {
      document.getElementById(newClient.id)?.scrollIntoView({behavior: 'smooth'});
    }, 250);


  }

  deletedSelected() {

    let tempSelected: any[] = [];
    for(let selected of this.selection.selected) {
      tempSelected.push(selected.id);
    }

    this.clients = this.clients.filter((obj: any) => !tempSelected.includes(obj.id));

    this.dataSource = new MatTableDataSource(this.clients);
    this.selection.clear();
    if(this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
