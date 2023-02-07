import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarBiblitecariosPageRoutingModule } from './listar-biblitecarios-routing.module';

import { ListarBiblitecariosPage } from './listar-biblitecarios.page';
import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarBiblitecariosPageRoutingModule,
    SharedModule
  ],
  declarations: [ListarBiblitecariosPage]
})
export class ListarBiblitecariosPageModule {}
