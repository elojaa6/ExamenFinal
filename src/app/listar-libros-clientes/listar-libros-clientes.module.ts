import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarLibrosClientesPageRoutingModule } from './listar-libros-clientes-routing.module';

import { ListarLibrosClientesPage } from './listar-libros-clientes.page';
import { BusquedaComponent } from '../component/busqueda/busqueda.component';
import { BusquedaModule } from '../component/busqueda/busqueda.module';
import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarLibrosClientesPageRoutingModule,
    SharedModule
  ],
  declarations: [ListarLibrosClientesPage]
})
export class ListarLibrosClientesPageModule {}
