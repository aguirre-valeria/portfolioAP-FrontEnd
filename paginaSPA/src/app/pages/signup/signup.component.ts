import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
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
    username: '',
    email: '',
    password: ''
  }

  public userLogin: Login | undefined;
  public user: Login["email"] | Login["email"] | any;

  constructor(
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  formSubmit(addForm: NgForm) {
    this.userLogin = addForm.value;
    console.log(this.userLogin);
    if (
      this.userLogin?.username == '' ||
      this.userLogin?.username == null) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'El nombre de usuario es requerido',
        showConfirmButton: false,
        timer: 1200
      })
      return;
    } else if (
      this.userLogin.email == '' ||
      this.userLogin.email == null ||
      !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(this.userlogin.email))) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'El email es requerido y debe de ser un email válido',
        showConfirmButton: false,
        timer: 1200
      })
      return;
    } else if (
      this.userLogin.password == '' ||
      this.userLogin.password == null ||
      !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/.test(this.userLogin.password))) {
      Swal.fire({
        icon: 'info',
        title: 'Ingresa una contraseña que:',
        html: '<li>Tenga al menos una letra minúscula</li><li>Tenga al menos un número</li><li>Tenga al menos una letra mayúscula</li><li>Tenga un mínimo de 8 caracteres</li>',
      })
      return;
    }

    this.loginService.addUserlogin(this.userLogin).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire(
          'Usuario guardado',
          'Usuario registrado con éxito en el sistema',
          'success');
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error en el sistema!'
        })
      }
    })
  }

}
