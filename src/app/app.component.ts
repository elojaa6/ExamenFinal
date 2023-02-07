import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './entidades/User';
import { AuthService } from './servicios/auth.service';
import { BibliotecarioService } from './servicios/bibliotecario.service';
import { InteractionService } from './servicios/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login: boolean = false

  rol: any


  uid: any = null

  updateDoc: any

  info!: User

  //user: any

  gogle: any

  photo:any
  displayName: any
  email: any


  constructor(
    private auth: AuthService,
    private interaction: InteractionService,
    private firestore: BibliotecarioService,
    private router: Router,
    private authService: AuthService
  ) {
    this.auth.stateUser().subscribe( res => {
      if(res){
        console.log('Esta Logeado');
        this.login = true
        this.gogle = JSON.parse(localStorage.getItem('user'))
        this.photo = this.gogle.photoURL
        this.displayName = this.gogle.displayName
        this.email = this.gogle.email
        this.rol = this.gogle.emailVerified
        console.log(this.rol)
      }else{
        console.log('No esta logeado');
        this.login = false
      }
    })

  }

  logout() {
    this.auth.logout()
    this.interaction.presentToast('Sesión finalizada')
    this.router.navigate(['/login'])
  }

  getUserBibliotecario(id: string){
    const path = 'Bibliotecario'
    this.firestore.getDoc<User>(path, id).subscribe( res =>{
      console.log(res);
      if(res){
        this.rol = res.perfil
        console.log(this.rol)
      }
      
    })
  }

  async getUid() {
    const uid = await this.authService.getUid()
    if (uid) {
      this.uid = uid
      console.log('id: ', uid)
      localStorage.setItem('idUser', uid)
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
}
