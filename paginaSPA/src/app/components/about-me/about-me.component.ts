import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/authentication/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  public user: User | undefined;
  public editProfile: User | undefined;
  public userLogin?: User;
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
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
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
  }

  public getUserLogin(user?: User): void {
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
    this.userService.getUserById(15).subscribe({
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
        alert(error.message);
      }
    })
  }

  public openModal(mode: string, user?: User): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
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
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      }
    })
  }

 public getLink() {
  this.getUserLogin()
  let currentUrl = window.location.href
  Swal.fire({
    icon: 'info',
    title: 'Comparte tu portfolio:',
    html: `<a>${currentUrl}${this.user?.username}</a>`,
  })
 }

}
