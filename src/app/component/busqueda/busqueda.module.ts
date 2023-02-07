import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './busqueda.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BusquedaComponent],
  imports: [
    CommonModule, IonicModule,
    
  ],
  exports: [BusquedaComponent],
})
export class BusquedaModule { }
