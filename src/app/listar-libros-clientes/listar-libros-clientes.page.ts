import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Libro } from '../entidades/Libro';
import { Reserva } from '../entidades/Reserva';
import { LibroService } from '../servicios/libro.service';
import { ReservaService } from '../servicios/reserva.service';

@Component({
  selector: 'app-listar-libros-clientes',
  templateUrl: './listar-libros-clientes.page.html',
  styleUrls: ['./listar-libros-clientes.page.scss'],
})
export class ListarLibrosClientesPage implements OnInit {

  user: any
  resultados: any
  filtro: any

  cliente: any

  lista: any

  constructor(
    private libro: LibroService,
    private reserva: ReservaService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLibros()
  }

   async getLibros() {
    /*this.libro.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => 
          ({ id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.resultados = data.filter(function(item){
        return item.estado === "Activo"
      });
      console.log(this.resultados);
    })*/
    this.user = this.activeRoute.snapshot.paramMap.get('id')
    console.log(this.user)
    const path = 'Bibliotecario/' + this.user + '/Libros'
    console.log(path);
    this.libro.getCollectionLibros<Libro>(path).subscribe(res => {
      console.log(res)
      this.resultados = res.filter(function(item){
        return item.estado === "Activo" 
      })
    })
  }

  async filterList(evt){
    this.resultados = await this.getLibros();

    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.user = this.activeRoute.snapshot.paramMap.get('id')
    const path = 'Bibliotecario/' + this.user + '/Libros'
    this.libro.getCollectionLibros<Libro>(path).subscribe(res => {
      console.log(res)
      this.resultados = res.filter(function(item){
        if (item.nombre && searchTerm && item.estado === "Activo") {
          return (item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.isbn.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
          || item.categoria.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 )
        }
        return item.estado === "Activo" 
      })
    })

  }

  datos : Reserva = {
    nombre: null,
    autor: null,
    categoria: null,
    stock: null,
    estado: null,
    isbn: null,
    foto: null,
    idBibliotecario: null,
    idCliente: null
  }

  reservaLibro(name){

    this.user = this.activeRoute.snapshot.paramMap.get('id')
    this.cliente = JSON.parse(localStorage.getItem('user'))

    this.filtro = this.resultados
    this.filtro = this.filtro.filter(function(item){
      return item.nombre == name
    })

    console.log(this.filtro)

    this.datos.nombre = this.filtro.nombre
    this.datos.autor = this.filtro.autor
    this.datos.categoria = this.filtro.categoria
    this.datos.stock = this.filtro.stock
    this.datos.estado = this.filtro.estado
    this.datos.isbn = this.filtro.isbn
    this.datos.foto = this.filtro.foto
    this.datos.idBibliotecario = this.user
    this.datos.idCliente = this.cliente.uid

    console.log(this.datos)
    this.reserva.create(this.datos)
    this.router.navigate(['/reservar'])
    return true
  }





}