import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user?: User | undefined;
  username?: string;

  constructor(private loginService:LoginService, private userService: UserService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getUserLogin();
    } else {
      this.getUserHome();
    }
  }
    

  public getUserLogin(): void {
    this.loginService.getCurrentUser().subscribe( {
      next: (user: any) => {
        this.user = user;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getUserHome(): void {
    this.userService.getUserAdmin().subscribe( {
      next: (user: any) => {
        this.user = user;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getUserByUsername(): void {
    this.userService.getUserByUserName().subscribe( {
      next: (user: any) => {
        console.log(user)
        console.log(this.userService.getUserByUserName())
        this.user = user;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
