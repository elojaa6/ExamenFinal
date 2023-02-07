import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false

  rol: 'cliente' | 'doctor' = 'doctor'

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  close() {
    console.log('click en cerrar')
    this.popoverController.dismiss()
  }

  

}
