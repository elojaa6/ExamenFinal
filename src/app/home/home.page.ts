import { Component } from '@angular/core';
import { CitaService } from '../servicios/cita.service';
import { map } from 'rxjs/operators';
import { Cita } from '../entidades/Cita';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  citas?: any[];
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private citaService: CitaService,
    private alertController: AlertController,

    private router: Router

  ) { }



  /*ngOnInit() {
    this.listAllCitas();
  }

  listAllCitas() {
    this.citaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.citas = data;
      console.log(this.citas);
    });
  }

  async deleteCita(id: string) {
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea eliminar el registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.citaService.delete(id).then(() => {
              this.listAllCitas();
              console.log('Cita eliminada exitosamente!')
            }).catch(err => console.log(err));
          },
        },
      ],
    });

    await alert.present();
  }*/


}
