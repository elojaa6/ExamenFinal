import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarLibrosClientesPage } from './listar-libros-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ListarLibrosClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarLibrosClientesPageRoutingModule {}
