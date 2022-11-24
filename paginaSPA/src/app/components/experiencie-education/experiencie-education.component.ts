import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Education } from 'src/app/models/education.model';
import { Experiencie } from 'src/app/models/experiencie.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperiencieService } from 'src/app/services/experiencie.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencie-education',
  templateUrl: './experiencie-education.component.html',
  styleUrls: ['./experiencie-education.component.css']
})
export class ExperiencieEducationComponent implements OnInit {
  public user?: User | undefined;
  public experiencies: Experiencie | any;
  public educations: Education | any;

  public editExperiencie: Experiencie | undefined;
  public deleteExperiencie: Experiencie | undefined;

  public editEducation: Education | undefined;
  public deleteEducation: Education | undefined;

  public username?: string | undefined | null;

  loggedIn = false;
  modelFormExp!: FormGroup;
  modelFormEdu!: FormGroup;

  constructor(
    private userService: UserService,
    private experiencieService: ExperiencieService,
    private educationService: EducationService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    formBuilder: FormBuilder) {
    this.modelFormExp = formBuilder.group({
      titleExp: ['', Validators.required],
      descripcionExp: ['', Validators.required],
      startDateExp: ['', [Validators.required, Validators.maxLength(3)]],
      sendDateExp: ['', [Validators.required, Validators.maxLength(3)]]
    })

    this.modelFormEdu = formBuilder.group({
      titleEdu: ['', Validators.required],
      descripcionEdu: ['', Validators.required],
      startDateEdu: ['', [Validators.required, Validators.maxLength(3)]],
      sendDateEdu: ['', [Validators.required, Validators.maxLength(3)]]
    })
  }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getExperiencie();
      this.getEducation();
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

  public getUserHome(): void {
    this.userService.getUserAdmin().subscribe({
      next: (user: any) => {
        this.user = user;
        this.experiencies = this.user?.experiencies;
        this.educations = this.user?.educations;
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
        this.experiencies = this.user?.experiencies;
        this.educations = this.user?.educations;
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

  public getExperiencie(user?: User): void {
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
        this.experiencies = this.user?.experiencies;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      },
    });
  }

  public getEducation(user?: User): void {
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
        this.educations = this.user?.educations;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      },
    });
  }

  public openModalExp(mode: string, experiencie?: Experiencie): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperiencieModal');
    } else if (mode === 'edit') {
      this.editExperiencie = experiencie;
      button.setAttribute('data-target', '#editExperiencieModal');
    } else if (mode === 'delete') {
      this.deleteExperiencie = experiencie;
      button.setAttribute('data-target', '#deleteExperiencieModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public openModalEdu(mode: string, education?: Education): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducationModal');
    } else if (mode === 'edit') {
      this.editEducation = education;
      button.setAttribute('data-target', '#editEducationModal');
    } else if (mode === 'delete') {
      this.deleteEducation = education;
      button.setAttribute('data-target', '#deleteEducationModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public addExperiencie(): void {
    this.experiencieService.addExperiencie(this.user?.id, this.modelFormExp.value).subscribe({
      next: (response: Experiencie) => {
        this.getExperiencie();
        this.modelFormExp.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
        this.modelFormExp.reset();
      }
    })
  }

  public updateExperiencie(experiencie: Experiencie): void {
    let editExperiencie = experiencie;
    let idEx = editExperiencie.idExp;
    let { idExp, ...updatedExperiencie } = editExperiencie;
    this.experiencieService.updateExperiencie(this.user?.id, idEx, updatedExperiencie).subscribe({
      next: (response: Experiencie) => {
        this.getExperiencie();
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

  public onDeleteExperiencie(idExp: number): void {
    this.experiencieService.deleteExperiencie(this.user?.id, idExp).subscribe({
      next: (response: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminada',
          text: '¡La experiencia ha sido eliminada!'
        })
        this.getExperiencie();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
        this.getExperiencie();
      },
    });
  }

  public addEducation(): void {
    this.educationService.addEducation(this.user?.id, this.modelFormEdu.value).subscribe({
      next: (response: Education) => {
        this.getEducation();
        this.modelFormEdu.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
        this.modelFormEdu.reset();
      }
    })
  }

  public updateEducation(education: Education): void {
    let editEducation = education;
    let idEd = editEducation.idEdu;
    let { idEdu, ...updatedEducation } = editEducation;
    this.educationService.updateEducation(this.user?.id, idEd, updatedEducation).subscribe({
      next: (response: Education) => {
        this.getEducation();
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

  public onDeleteEducation(idEdu: number): void {
    this.educationService.deleteEducation(this.user?.id, idEdu).subscribe({
      next: (response: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminada',
          text: '¡La educación ha sido eliminada!'
        })
        this.getEducation();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
        this.getEducation();
      },
    });
  }

}
