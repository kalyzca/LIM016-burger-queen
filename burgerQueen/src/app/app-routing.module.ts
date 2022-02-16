import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ingreso/login/login.component';
import { MenuComponent } from './atencion/menu/menu.component';
import { PgeNotFoundComponent } from './pge-not-found/pge-not-found.component';
import { WelcomeComponent } from './ingreso/welcome/welcome.component';
import { OpcionesComponent } from './atencion/opciones/opciones.component'

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'app-welcome', component:WelcomeComponent},
    {path:'app-login', component:LoginComponent},
    {path: 'app-menu', component: MenuComponent},
    {path: 'app-opciones', component: OpcionesComponent},
    {path: '', redirectTo: '/app-welcome', pathMatch: 'full'},
    {path: '**', component: PgeNotFoundComponent}
  ])
],
  exports: [RouterModule]
})

export class AppRoutingModule { }
