import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.page.html',
  styleUrls: ['./editar-libro.page.scss'],
})
export class EditarLibroPage implements OnInit {

  id: any;
  citaForm!: FormGroup;

  constructor( 
    private libroService: LibroService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder) {
      this.id = this.actRoute.snapshot.paramMap.get('id');
      console.log(this.id)
      this.libroService.getById(this.id).subscribe(res =>{
        console.log(res)
        this.citaForm.setValue(res);
        
      })
    }

  ngOnInit() {
    this.citaForm = this.fb.group({
      nombre: [''],
      autor: [''],
      categoria: [''],
      stock: [''],
      isbn: ['']
    })
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  updateCita(){
    if (!this.citaForm.valid) {
      return false;
    } else {      
      this.libroService.update(this.id, this.citaForm.value).then(() => {
        console.log('Libro actualizada exitosamente!')
        this.citaForm.reset();
        this.router.navigate(['/listar-citas']);
      });
    }
    return true;
  }

}
