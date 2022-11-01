import { LoginService } from './../../services/authentication/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user:any = null;

  constructor(public login : LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUserLogin();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUserLogin();
      }
    )
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

/*   public user : User | undefined;
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.userService.getUser().subscribe( {
      next: (response: User) => {
        this.user = response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  login() {
    this.router.navigate(['/login']);
  } */

}
