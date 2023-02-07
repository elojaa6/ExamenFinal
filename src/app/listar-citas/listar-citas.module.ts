import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarCitasPageRoutingModule } from './listar-citas-routing.module';

import { ListarCitasPage } from './listar-citas.page';
import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarCitasPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ListarCitasPage]
})
export class ListarCitasPageModule {}
