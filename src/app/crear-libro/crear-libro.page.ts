import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from '../entidades/Libro';
import { BibliotecarioService } from '../servicios/bibliotecario.service';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.page.html',
  styleUrls: ['./crear-libro.page.scss'],
})
export class CrearLibroPage implements OnInit {

  id: any;
  newFile: any;

  idBi!: any
  dbPath!: any;
  user: any 
  

  datos: Libro = {
    //id: '',
    nombre: null,
    autor: null,
    categoria: null,
    stock: null,
    estado: 'Activo',
    isbn: null,
    foto: null,
    idBibliotecario: null,
    idCliente: null

  }

  constructor(
    private firestore: BibliotecarioService,
    private libroService: LibroService,
    private router: Router
    ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
    this.dbPath = '/Bibliotecario/' + this.user.uid + '/Libros';
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  async saveLibro() {
    this.datos.idBibliotecario = this.user.uid;
    console.log(this.datos.idBibliotecario)
    console.log(this.datos);
    if (this.newFile !== undefined) {
      const res = await this.libroService.uploadImage(this.newFile, this.dbPath, this.datos.nombre);
      this.datos.foto = res;
    }
    //this.datos.id = 
    this.libroService.create(this.datos);
    console.log('Cita creada exitosamente!');
    console.log(this.datos)
    this.router.navigate(['/listar-citas']);
    return true;
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((como) => {
        this.datos.foto = como.target?.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
