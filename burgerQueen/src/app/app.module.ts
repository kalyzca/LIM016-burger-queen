import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { IngresoModule } from './ingreso/ingreso.module'

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// import { SharedModule } from './shared/shared.module';
// import { MeseroModule } from './mesero/mesero.module';
// import { CocineroModule } from './cocinero/cocinero.module';
import { ViewModule } from './view/view.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministradorModule } from './administrador/administrador.module';

// import { AdministradorModule } from './administrador/administrador.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    IngresoModule,
    ViewModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
    // SharedModule,
    // MeseroModule,
    // CocineroModule,
    // AdministradorModule,

    AdministradorModule,
    AppRoutingModule,
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
