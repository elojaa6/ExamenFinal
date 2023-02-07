import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearLibroPageRoutingModule } from './crear-libro-routing.module';

import { CrearLibroPage } from './crear-libro.page';
import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearLibroPageRoutingModule,
    SharedModule
  ],
  declarations: [CrearLibroPage]
})
export class CrearLibroPageModule {}
