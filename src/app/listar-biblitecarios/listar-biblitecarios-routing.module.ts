import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarBiblitecariosPage } from './listar-biblitecarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListarBiblitecariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarBiblitecariosPageRoutingModule {}
