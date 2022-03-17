import { Component, OnInit } from '@angular/core';
// import { MeseroModule } from 'src/app/mesero/mesero.module';
import { Router } from '@angular/router';
import { doc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { createUsersService } from 'src/app/services/create-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  getRolUser$: BehaviorSubject<string>;
  title:string="Los angeles de charlie";
  usuario ={
    email:"",
    password:""
  }

  constructor( private authService:AuthService, private router:Router, private createUser : createUsersService) { 
      this.getRolUser$ = this.createUser.getRol();
  }

  ngOnInit(): void { 
   
  }
  
  multiple(uid : any) {
    //mesero
    this.createUser.getdocUser(uid).subscribe((doc) =>{
      const rol = doc.payload.data().rol;
        console.log(uid, doc.payload.data().rol);
         if (doc.payload.exists) {
          console.log("Document data:", doc);
          switch(rol){
            case 'Mesero': this.router.navigateByUrl("/carta")
            break;
            case 'Cocinero': this.router.navigateByUrl("/pedidosMesero")
            break;
            case 'Administrador': this.router.navigateByUrl("/gestionUsuarios")
            break;
            default: this.router.navigateByUrl("/")
            break;
          }
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      this.getRolUser$.next(rol);
    return rol;
    }) 
    
    //cocinero
  } 
  
  ingresar(){
  console.log('este es login',this.usuario)
  // desestrucutrar una variable
  const {email, password} = this.usuario;

  this.authService.login(email, password)
  .then(user => {
    console.log("Bienvenido ", user)
      if(user && user.user?.emailVerified){
        console.log('entras a una ventana');
        this.router.navigateByUrl("/carta");
        console.log(user.user?.emailVerified);
        console.log(user.user.uid);
        const idUser = user.user.uid;
        this.multiple(idUser);
        return;
      } 
      else if(user){
        console.log('modal para pedir que verifiquesu usuario');
      } 
      
  }).catch(err => {
      console.log(err);
  });
  }

  resetPass(){
    console.log("SWEET ALERT PARA PEDIR QUE REVISE EL CORREO Y RESTABLEZCA SU CONTRASEÑA");
    const {email} = this.usuario;
    this.authService.resetPassword(email);
    console.log('Email de reseteo enviado');
  }
}
