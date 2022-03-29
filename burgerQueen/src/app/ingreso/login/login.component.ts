import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MeseroModule } from 'src/app/mesero/mesero.module';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { createUsersService } from 'src/app/services/create-users.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  // getRolUser$: BehaviorSubject<string>;
  
  subscribe: Subscription | any;
  
  usuario = {
    email: "",
    password: ""
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private authService: AuthService, 
    private router: Router, 
    private createUser: createUsersService, 
    private storageService: StorageService) {
    // this.getRolUser$ = this.createUser.getRol();
  }

  ngOnInit(): void {
  }

  seePassword() {
    const passLogin = document.querySelector('#passLogin') as HTMLInputElement
    const icon = document.querySelector('i') as HTMLElement
    if (passLogin.type === 'password') {
      passLogin.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
    else {
      passLogin.type = 'password';
      icon.classList.add('fa-eye-slash');
      icon.classList.remove('fa-eye');
    }
  }

  selectFirstView(uid: any) {
    this.subscribe =
      // obtener documento del usuarios de Firestore
      this.createUser.getdocUser(uid).subscribe((doc) => {
        const rol = doc.payload.data().rol;
        if (doc.payload.exists) {

          // sube data del documento del usuario a sessionStorage
          this.storageService.setCurrentUser('currentUser', { ...doc.payload.data() });
          switch (rol) {
            case 'Mesero': this.router.navigateByUrl("/carta")
              break;
            case 'Cocinero': this.router.navigateByUrl("/totalPedidos")
              break;
            case 'Administrador': this.router.navigateByUrl("/gestionUsuarios")
              break;
            default: this.router.navigateByUrl("/")
              break;
          }
        } else {
          this.Toast.fire({
            icon: 'warning',
            title: 'Usuario no encontrado.',
          })
        }
        return rol;
      })
  }

  ngOnDestroy() {
    if(this.subscribe){
      this.subscribe.unsubscribe();
    }
  }

  login() {
    const { email, password } = this.usuario;
    this.authService.login(email, password)
      .then(user => {
        if (user && user.user?.emailVerified) {
          const idUser = user.user.uid;
          this.selectFirstView(idUser);

          this.Toast.fire({
            icon: 'success',
            title: 'Inició sesión correctamente.'
          })
          return;
        }
        else if (user) {
          this.Toast.fire({
            icon: 'info',
            title: 'Verifique su correo electrónico y haga click en el link.'
          })
        }
      }).catch(err => {
        this.loginValidator(err);
      });
  }

  resetPassword() {
    const { email } = this.usuario;
    this.authService.resetPassword(email);
    this.Toast.fire({
      icon: 'info',
      title: 'Revise su correo electrónico y restablezca su contraseña.'
    })
  }

  loginValidator(err: object | any) {
    if ((this.usuario.email === '') || (this.usuario.password === '')) {
      console.log('Debes completar todos los campos');
      this.Toast.fire({
        icon: 'error',
        title: 'Debes completar todos los campos.'
      })
    }
    if (this.usuario.email !== '' && this.usuario.password !== '') {
      if (this.usuario.password.length < 6) {
        this.Toast.fire({
          icon: 'error',
          title: 'El password debe contener minimo 6 caracteres.'
        })
      } else if (err.code === 'auth/wrong-password') {
        this.Toast.fire({
          icon: 'error',
          title: 'Contraseña incorrecta',
        })
      }
      if (err.code === 'auth/invalid-email') {
        this.Toast.fire({
          icon: 'error',
          title: 'Correo inválido (Ejm.: correo@ejemplo.com).',
        })
      }
      if (err.code === 'auth/user-not-found') {
        this.Toast.fire({
          icon: 'error',
          title: 'Usuario no encontrado.',
        })
      }
    }

  }
}
