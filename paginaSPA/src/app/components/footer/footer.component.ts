import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public user : User | undefined;
  constructor(private userService : UserService,  private loginService:LoginService) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getUser();
    }
  }

  public getUser(): void {
    this.loginService.getCurrentUser().subscribe( {
      next: (user: any) => {
        this.user = user;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

/*   public getUser(): void {
    this.userService.getUser().subscribe( {
      next: (response: User) => {
        this.user = response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  } */

}
