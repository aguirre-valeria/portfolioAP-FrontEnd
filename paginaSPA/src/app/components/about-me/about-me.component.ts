import { UserloginService } from './../../services/authentication/userlogin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  public user : User | undefined;
  public editProfile : User | undefined;
  public userLogin? : User;
  loggedIn = false;
  
  constructor(private userService : UserService, private loginService:LoginService) { }

  ngOnInit(): void {
     if (this.loginService.isLoggedIn()) {
      this.getUserLogin();
      this.loggedIn = true;
    } else {
      this.getUserHome();
    }
  }

  public getUserLogin(user?: User): void {
    this.loginService.getCurrentUser().subscribe( {
      next: (user: any) => {
        this.user = user;
        console.log(this.user)
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
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

/*   public getUser(userLogin?: User): void {
    this.userService.getUser(userLogin?.userLogin).subscribe( {
      next: (response: User) => {
        this.user = response;
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  } */

  public openModal(mode: string, user?: User) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit') {
      this.editProfile = user;
      console.log(this.editProfile)
      button.setAttribute('data-target', '#editProfileModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public updateProfile(user: User): void {
    this.editProfile = user;
    this.userService.updateUser(user).subscribe({
      next: (response: User) => {
        this.getUserLogin();
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
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
