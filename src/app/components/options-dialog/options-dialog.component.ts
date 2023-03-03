import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';

interface Options {
  value: any,
  label: any,
  name: any,
  price: any,
  link: any
}

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.css']
})
export class OptionsDialogComponent implements OnInit {

  displayedColumns: string[] = ['value', 'label', 'name', 'price', 'link', 'delete'];
  dataSource: MatTableDataSource<Options>;

  public question: any;

  public focuedValue = ''

  public options: Options[] = [{value: 1, label: null, name: null, price: null, link: null}];

  @ViewChild(MatTable) table: MatTable<Options> | undefined;

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.options);
  }

  ngOnInit(): void {
    // console.log("DATYA", this.data);
    if(this.data?.question) {
      this.question = this.data.question;
      console.log("this.question", this.question);
      if(this.question?.options && this.question?.options.length > 0) {
        this.options = this.question.options;
        this.dataSource = new MatTableDataSource(this.options);
      }
    }
  }

  onNoClick(): void {
    console.log("sd")
    this.dialogRef.close();
  }

  addOption() {
    if(this.options.length < 10) {
      this.options.push({
        value: (this.options.length + 1), label: null, name: null, price: null, link: null
      })
      this.renderTable();
    }
  }

  deleteOption(i: number) {
    if(this.options.length > 1) {
      this.options.splice(i, 1);
      this.renderTable();
    }
    else {
      this.openSnackBar('You have have at least 1 option', 'Warning');
    }
  }

  save() {
    if(this.validateOption() == true) {
      this.dialogRef.close(this.options);
    }
    else {
      this.hasErrors = true;
    }
  }

  renderTable() {
    if(this.table) {
      this.table.renderRows();
    }
  }

  public hasErrors = false;

  validateOption() {

    for(let i=0; i<this.options.length; i++) {

      const currentOption = this.options[i];
      if(currentOption.label?.trim().length > 0 && (currentOption.price != null &&  currentOption.price >= 0)) {
        currentOption.value = i;
      }
      else {
        return false;
      }
    }

    return true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  focus(value: any) {
    this.focuedValue = value;
  }
}
