import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContractGeneratorComponent } from './pages/contract-generator/contract-generator.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
  {
    path: '',
    component: ContractGeneratorComponent,
    // loadChildren: () => import('./pages/contract-generator/contract-generator.module').then(m => m.ContractGeneratorModule)
  },
  {
    path: 'collection',
    component: CollectionComponent,
    // loadChildren: () => import('./pages/contract-generator/contract-generator.module').then(m => m.ContractGeneratorModule)
  },
  {
    path: 'clients',
    component: ClientsComponent,
    // loadChildren: () => import('./pages/contract-generator/contract-generator.module').then(m => m.ContractGeneratorModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
