import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { CartaComponent } from '../mesero/carta/carta.component';
import { CartaOpcionesComponent } from '../mesero/carta-opciones/carta-opciones.component';
import { GestionUsuariosComponent } from '../administrador/gestion-usuarios/gestion-usuarios.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'gestionUsuarios', component: GestionUsuariosComponent },
      { path: 'login', component: LoginComponent },
      { path: 'carta', component: CartaComponent },
      { path: 'cartaOpciones', component:CartaOpcionesComponent },
      { path: 'notFound', component: PageNotFoundComponent },
      { path: 'pedidosMesero', component: PedidosMeseroComponent },
      { path: '**', redirectTo: 'notFound', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class IngresoRoutingModule { }
