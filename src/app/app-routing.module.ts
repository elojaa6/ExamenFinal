import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToPerfil = () => redirectLoggedInTo(['perfil']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'listar-citas',
    loadChildren: () => import('./listar-citas/listar-citas.module').then( m => m.ListarCitasPageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToPerfil}
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToPerfil}
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'crear-libro',
    loadChildren: () => import('./crear-libro/crear-libro.module').then( m => m.CrearLibroPageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'listar-no-activos',
    loadChildren: () => import('./listar-no-activos/listar-no-activos.module').then( m => m.ListarNoActivosPageModule),
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin},
  },
  {
    path: 'listar-biblitecarios',
    loadChildren: () => import('./listar-biblitecarios/listar-biblitecarios.module').then( m => m.ListarBiblitecariosPageModule)
  },
  {
    path: 'listar-libros-clientes/:id',
    loadChildren: () => import('./listar-libros-clientes/listar-libros-clientes.module').then( m => m.ListarLibrosClientesPageModule)
  },
  {
    path: 'reservar/:id',
    loadChildren: () => import('./reservar/reservar.module').then( m => m.ReservarPageModule)
  },
  {
    path: 'editar-libro/:id',
    loadChildren: () => import('./editar-libro/editar-libro.module').then( m => m.EditarLibroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
