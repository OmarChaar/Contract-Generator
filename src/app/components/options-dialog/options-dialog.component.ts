import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  public question: any;

  public options: Options[] = [{value: null, label: null, name: null, price: null, link: null}];

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log("DATYA", this.data);
    if(this.data?.question) {
      this.question = this.data.question;
      if(this.question.options.length > 0) {
        this.options = this.question.options;
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
    }
  }

  deleteOption(i: number) {
    if(this.options.length > 1) {
      this.options.splice(i, 1);
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
}
