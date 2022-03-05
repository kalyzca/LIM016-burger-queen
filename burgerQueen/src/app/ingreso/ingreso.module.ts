import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module'

import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ViewModule } from '../view/view.module';

@NgModule({
  declarations: [
    LoginComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    ViewModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    LoginComponent,
    WelcomeComponent,
   
  ]
})

export class IngresoModule { }
