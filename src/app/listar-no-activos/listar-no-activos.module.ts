import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarNoActivosPageRoutingModule } from './listar-no-activos-routing.module';

import { ListarNoActivosPage } from './listar-no-activos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarNoActivosPageRoutingModule
  ],
  declarations: [ListarNoActivosPage]
})
export class ListarNoActivosPageModule {}
