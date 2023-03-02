import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContractGeneratorComponent } from './contract-generator.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ContractGeneratorComponent
  }
];

@NgModule({
  declarations: [ContractGeneratorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class ContractGeneratorModule { }
