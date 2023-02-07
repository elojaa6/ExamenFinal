import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarNoActivosPage } from './listar-no-activos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarNoActivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarNoActivosPageRoutingModule {}
