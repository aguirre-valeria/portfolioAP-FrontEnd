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
/*   username?: string; */
  public username?: string | undefined | null;
  loggedIn = false;

  constructor(
    private loginService:LoginService, 
    private userService: UserService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getUserLogin();
      this.loggedIn = true;
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.username = params.get('username');
      });
      if(this.username === null) {
        // console.log(this.username)
        this.getUserHome();
        this.loggedIn = false;
      } else {
        this.getUserByUsername(this.username);
        this.loggedIn = false;
        // console.log(this.username)
      }
      
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

  public getUserByUsername(username : string | null | undefined): void {
/*     let userN = username;
    console.log(this.username); */
    this.userService.getUserByUserName(username).subscribe( {
      next: (user: any) => {
        this.user = user;
        // console.log(user)
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
