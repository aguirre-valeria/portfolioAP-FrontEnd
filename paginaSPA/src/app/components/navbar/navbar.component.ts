import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user : User | undefined;
  constructor(private userService : UserService) { }

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

}
