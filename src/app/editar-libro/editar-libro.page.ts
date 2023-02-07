import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../entidades/Libro';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.page.html',
  styleUrls: ['./editar-libro.page.scss'],
})
export class EditarLibroPage implements OnInit {

  id: any;
  citaForm!: FormGroup;

  newFile = ''
  libro: Libro = {
    nombre: null,
    autor: null,
    categoria: null,
    stock: null,
    estado: 'Activo',
    isbn: null,
    foto: null,
    idBibliotecario: null,
    idCliente: null

  };

  constructor( 
    private libroService: LibroService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder) {
    }

  ngOnInit() {

    this.getLibro();
  }

  getLibro(){
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    this.libroService.getById(this.id).subscribe(res =>{
      this.libro = res;
    })
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const path = 'Libros'

      const name = this.libro.nombre;
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (async (como) => {
        this.libro.foto = como.target?.result as string;
        const res = await this.libroService.uploadImage(this.newFile, path, name);

      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  updateCita(){

    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id)

    this.libroService.update(this.id,this.libro,).then(() => {
      console.log('Cita creada exitosamente!' + this.libro)
      this.router.navigate(['/listar-citas']);
    });
  }

}
