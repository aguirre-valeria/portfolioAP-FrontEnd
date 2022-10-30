import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  public user : User | undefined;
  public editUser : User | undefined;
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

/*   public getUsers(): any {
    this.userService.getUsers().subscribe( {
      next: (response: User[]) => {
        console.log(response.map);
        
        
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
 */


}
