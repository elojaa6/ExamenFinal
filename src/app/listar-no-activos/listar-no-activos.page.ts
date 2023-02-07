import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Libro } from '../entidades/Libro';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'app-listar-no-activos',
  templateUrl: './listar-no-activos.page.html',
  styleUrls: ['./listar-no-activos.page.scss'],
})
export class ListarNoActivosPage implements OnInit {

  user: any
  resultados: any

  constructor(
    private libro: LibroService
  ) { }

  ngOnInit() {
    this.getLibros()
  }

  getLibros() {
    this.libro.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => 
          ({ id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.resultados = data.filter(function(item){
        return item.estado === "No-Activo"
      });
      console.log(this.resultados);
    })
  }

}
