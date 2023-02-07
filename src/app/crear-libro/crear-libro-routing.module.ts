import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearLibroPage } from './crear-libro.page';

const routes: Routes = [
  {
    path: '',
    component: CrearLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearLibroPageRoutingModule {}
