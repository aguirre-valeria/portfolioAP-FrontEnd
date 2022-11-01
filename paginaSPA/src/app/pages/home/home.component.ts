import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user?: User | undefined;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.getUser();
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

}
