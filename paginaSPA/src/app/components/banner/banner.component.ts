import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public user: User | undefined;
  public editUser: User | undefined;
  public username?: string | undefined | null;

  loggedIn = false;

  constructor(
    private userService: UserService, 
    private loginService: LoginService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getUserLogin();
      this.loggedIn = true;
    } this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
    });
    if (this.username === null) {
      this.getUserHome();
      this.loggedIn = false;
    } else {
      this.getUserByUsername(this.username);
      this.loggedIn = false;
    }
  }

  public getUserLogin(): void {
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      }
    })
  }

  public getUserHome(): void {
    this.userService.getUserAdmin().subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      }
    })
  }
  
  public getUserByUsername(username: string | null | undefined): void {
    this.userService.getUserByUserName(username).subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      }
    })
  }

}
