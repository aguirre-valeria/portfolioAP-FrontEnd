import { UserService } from 'src/app/services/user.service';
import { UserloginService } from './../../services/authentication/userlogin.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/authentication/login.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public userlogin = {
    username : '',
    email : '',
    password : ''
  }

  public userLogin : Login | undefined;
  public user : Login["email"] | Login["email"] | any;

  constructor(private loginService : LoginService, private userService : UserService) { }

  ngOnInit(): void {
  }


  formSubmit(addForm: NgForm){
    this.userLogin = addForm.value;
    console.log(this.userLogin);
    if(this.userLogin?.username == '' || this.userLogin?.username == null){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'El nombre de usuario es requerido',
        showConfirmButton: false,
        timer: 1200
      })
      return;
    } else if(this.userLogin.email == '' || this.userLogin.email == null){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'El email es requerido',
        showConfirmButton: false,
        timer: 1200
      })
      return;
    } else if(this.userLogin.password == '' || this.userLogin.password == null){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'La contraseña es requerida',
        showConfirmButton: false,
        timer: 1200
      })
      return;
    }

    this.loginService.addUserlogin(this.userLogin).subscribe( {
      next: (data) => {
        console.log(data);
        Swal.fire(
          'Usuario guardado',
          'Usuario registrado con éxito en el sistema',
          'success');
      },
      error:(error:HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error en el sistema!'
        })
      }
    })

/*     this.userService.updateUser(this.user).subscribe( {
      next: (data) => {
        
        console.log(data);
        Swal.fire(
          'Veremos',
          'Usuario registrado con éxito en el sistema',
          'success');
      },
      error:(error:HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error en el sistema!'
        })
      }
    }) */

  }


}
