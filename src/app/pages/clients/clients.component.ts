import { Component, OnInit, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';

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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  public clients: Client[] = [
    {
      id: uuidv4(),
      cpf_cnpj: null,
      name: null,
      apartment: null,
      area: null,
      type: null,
      email: null,
      phone: null,
    }
  ];

  constructor() {
     // Create 100 users
     const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));
      console.log("users", users);
     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if(this.paginator) {
      this.dataSource.paginator = this.paginator
    };
    if(this.sort) {
      this.dataSource.sort = this.sort;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    console.log("event", event, this.displayedColumns);
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    console.log("NEW this.displayedColumns", this.displayedColumns);
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

}
