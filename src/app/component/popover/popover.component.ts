import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  login: boolean = false

  rol: 'cliente' | 'doctor' = 'doctor'
  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }

  close() {
    console.log('click en cerrar')
    this.popoverController.dismiss()
  }

  async openMenu() {
    const popover = await this.popoverController.create({
      component: PopoverController,
      translucent: true
    });
    await popover.present()

    const { role } = await popover.onDidDismiss()
    console.log('onDisDismiss resolved with role', role)
  }

}
