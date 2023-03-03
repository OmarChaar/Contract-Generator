import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { PromptComponent } from './prompt/prompt.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    OptionsDialogComponent,
    PromptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule
  ],
  exports: [
    OptionsDialogComponent,
    PromptComponent
  ]
})
export class SharedModule { }
