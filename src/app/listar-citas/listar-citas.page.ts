import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Cita } from '../entidades/Cita';
import { Libro } from '../entidades/Libro';
import { InteractionService } from '../servicios/interaction.service';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.page.html',
  styleUrls: ['./listar-citas.page.scss'],
})
export class ListarCitasPage implements OnInit {

  user: any
  resultados?: any[]

  constructor(
    private libro: LibroService,
    private interaction: InteractionService,
    private alertController: AlertController
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
        return item.estado === "Activo"
      });
      console.log(this.resultados);
    })
  }

  async delete(id: string){    
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea eliminar el libro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',          
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            console.log("entre")
            this.libro.delete(id).then(() => {
              this.getLibros();
              console.log('Libro eliminada exitosamente!')
            }).catch(err => console.log(err));
          },
        },
      ],
    });

    await alert.present();    
  }

}
