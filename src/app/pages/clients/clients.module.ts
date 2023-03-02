import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent
  }
];

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientsModule { }
