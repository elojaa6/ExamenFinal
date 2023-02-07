import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: any

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje,
    });
    await this.loading.present();
  }

  async closeLoading() {
    await this.loading.dismiss();
  }

}
