import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { UserloginService } from 'src/app/services/authentication/userlogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 
  logindata = {
    username : '',
    password : '',
  }

  public loginData : User | undefined;

  constructor(private loginService:LoginService, private userloginService : UserloginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(addForm: NgForm){
    this.loginData = addForm.value;
    console.log(this.loginData);
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        console.log(this.loginService);
        this.loginService.loginUserLogin(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'ADMIN'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'NORMAL'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        alert('Detalles inválidos , vuelva a intentar !!')
      }
    )
  }
}


/* export class LoginComponent implements OnInit {
  // public user? : UserLogin | undefined;

  loginData = {
    "username" : '',
    "password" : '',
  }

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    // this.loginData = addForm.value;
    // console.log(this.loginData);
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'El nombre de usuario es requerido',
        showConfirmButton: false,
        timer: 1200
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'La contraseña es requerida',
        showConfirmButton: false,
        timer: 1200
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe( {
      next: (data:any) => {
        console.log(this.loginData);
        console.log(data);
        this.loginService.loginUser(data.token);
        console.log(data.token);
        this.loginService.getCurrentUserLogin().subscribe( {
          next: (userLogin:any) => {
          console.log(userLogin);
          this.loginService.setUserLogin(userLogin);
          

          if(this.loginService.getUserRole() == 'ADMIN'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'NORMAL'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        }})
      }, error: (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Datos inválidos, vuelva a intentar!'
        })
      }});
      }
        
} */