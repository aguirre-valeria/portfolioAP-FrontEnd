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

  constructor(public loginService : LoginService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn() === false) {
      this.getUserHome();
    } else {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUserLogin();
    this.loginService.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUserLogin();
      }
    )
    }
  }

  public logout(){
    this.loginService.logout();
    window.location.reload();
  }

  public getUserHome(): void {
    this.userService.getUserById(15).subscribe( {
      next: (user: any) => {
        this.user = user;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
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
