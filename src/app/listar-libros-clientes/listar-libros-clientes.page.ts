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

  cero: any
  uno: 1

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
    this.libro.getCollectionLibros(path).snapshotChanges().pipe(
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
    this.libro.getCollectionLibros(path).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => 
          ({ id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(res => {
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
  newFile = ''

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

  datosLibro: Libro = {
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

  getId(){
  }

  reservaLibro(idLibro){
    
    console.log(idLibro)
    this.user = this.activeRoute.snapshot.paramMap.get('id')
    console.log(this.user)
    const path = 'Bibliotecario/' + this.user + '/Libros'
    console.log(path);

    this.libro.getByIdLibro(idLibro, path).subscribe(res => {
      console.log(res)
      this.datosLibro = res
      
    console.log('2')
      console.log(this.datosLibro)
    })

    this.cliente = JSON.parse(localStorage.getItem('user'))

    console.log(this.datosLibro)

    this.datos.nombre = this.datosLibro.nombre
    this.datos.autor = this.datosLibro.autor
    this.datos.categoria = this.datosLibro.categoria
    this.datos.stock = this.datosLibro.stock
    this.datos.estado = this.datosLibro.estado
    this.datos.isbn = this.datosLibro.isbn
    this.datos.foto = this.datosLibro.foto
    this.datos.idBibliotecario = this.user
    this.datos.idCliente = this.cliente.uid

    this.datosLibro.stock = parseInt(this.datosLibro.stock) - 1
    this.cero = this.datosLibro.stock

    
    console.log(this.cero)

    if (this.datosLibro.stock == this.cero) {
      console.log('cambio')
      this.datosLibro.estado == "No-Activo";
      this.libro.updateStock(idLibro,this.datosLibro,path)
    }

    console.log('1')
    console.log(this.datos)
    this.reserva.create(this.datos)
    //this.router.navigate(['/reservar'])
    return true
  }





}