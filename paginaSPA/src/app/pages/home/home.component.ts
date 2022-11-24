import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user?: User | undefined;
  public username?: string | undefined | null;

  loggedIn = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getUserLogin();
      this.loggedIn = true;
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.username = params.get('username');
      });
      if (this.username === null) {
        this.getUserHome()
        // this.router.navigate(['404'])
        this.loggedIn = false;
      } else {
        this.getUserByUsername(this.username);        
        this.loggedIn = false;
      }
    }
  }

  public getUserLogin(): void {
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
    this.userService.getUserAdmin().subscribe({
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
        if(this.user === null) {
          this.router.navigate(['404'])
        }
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

}
