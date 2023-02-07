import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { InteractionService } from '../servicios/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = {
    correo: null,
    password: null
  }

  constructor(
    private auth: AuthService,
    private interaction: InteractionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  async login(){
    await this.interaction.presentLoading('Ingresando.....')
    console.log('credenciales -> ', this.credenciales)
    const res = await this.auth.login(this.credenciales.correo!, this.credenciales.password!).catch(error => {
      console.log('error');
      this.interaction.closeLoading()
      this.interaction.presentToast('Usuario o contraseña incorrectas')
    })
    if(res) {
      console.log('res ->', res)
      this.interaction.closeLoading()
      this.interaction.presentToast('Has ingresado con éxito')
      this.router.navigate(['/home'])
    }
  }

  google(){
    this.auth.GoogleAuth();
    this.router.navigate(['/home'])
  }

}
