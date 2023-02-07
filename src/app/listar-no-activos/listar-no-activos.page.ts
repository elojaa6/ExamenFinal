import { Component, OnInit } from '@angular/core';
import { Libro } from '../entidades/Libro';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'app-listar-no-activos',
  templateUrl: './listar-no-activos.page.html',
  styleUrls: ['./listar-no-activos.page.scss'],
})
export class ListarNoActivosPage implements OnInit {

  user: any
  resultado: Libro[] = []

  constructor(
    private libro: LibroService
  ) { }

  ngOnInit() {
    this.getLibros()
  }

  getLibros() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const path = 'Bibliotecario/' + this.user.uid + '/Libros'
    console.log(path);
    this.libro.getCollectionLibros<Libro>(path).subscribe(res => {
      console.log(res)
      this.resultado = res.filter(function(item){
        return item.estado === "No-Activo"
      })
    })
  }

}
