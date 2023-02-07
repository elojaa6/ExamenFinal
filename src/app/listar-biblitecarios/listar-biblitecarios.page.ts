import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { BibliotecarioService } from '../servicios/bibliotecario.service';

@Component({
  selector: 'app-listar-biblitecarios',
  templateUrl: './listar-biblitecarios.page.html',
  styleUrls: ['./listar-biblitecarios.page.scss'],
})
export class ListarBiblitecariosPage implements OnInit {

  bibliotecarios: any

  constructor(
    private bibliotecarioService: BibliotecarioService
  ) { }

  ngOnInit() {
    this.listAllBibliotecarios();
  }

  listAllBibliotecarios(){
    this.bibliotecarioService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.bibliotecarios = data;
      /*console.log(this.bibliotecarios);
      data.forEach(function(numero) {
        localStorage.setItem("idBibliotecario", numero.id)
        console.log(localStorage.getItem("idBibliotecario"))
      });*/
    });
  }

}
