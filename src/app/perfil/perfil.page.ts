import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from '../entidades/User';
import { AuthService } from '../servicios/auth.service';
import { BibliotecarioService } from '../servicios/bibliotecario.service';
import { InteractionService } from '../servicios/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid: any = null

  updateDoc: any

  info!: User

  constructor(
    private authService: AuthService,
    private firestore: BibliotecarioService,
    private alertController: AlertController,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.getUid()
  }

  async getUid() {
    const uid = await this.authService.getUid()
    if (uid) {
      this.uid = uid
      console.log('id: ', uid)
      this.getInfoUser()
    } else {
      console.log('no existe id')
    }
  }

  getInfoUser() {
    const path = 'Bibliotecario'
    const id = this.uid
    this.firestore.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.info = res
      }

    })
  }

  async editAttrib(name: string) {
    const alert = await this.alertController.create({
      header: 'Editar' + name,
      inputs: [{
        name,
        type: 'text',
        placeholder: 'Ingresa tu' + name
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm cancel');
        }
      }, {
        text: 'Aceptar',
        handler: (ev) => {
          console.log('Confirm ok', ev);
          this.saveAttrib(name, ev[name])
        }
      }],

    });

    await alert.present();
  }

  async saveAttrib(name: any, input: any) {
    //await this.interactionService.presentLoading('Actualizando...')
    const path = 'Bibliotecario'
    const id = this.uid
    this.updateDoc = {
    }
    this.updateDoc[name] = input    
    this.firestore.updateDoc(this.updateDoc,path,id).then(() => {
      this.interactionService.presentToast('Actualizado con éxito')
      this.interactionService.closeLoading
    })
  }

}
