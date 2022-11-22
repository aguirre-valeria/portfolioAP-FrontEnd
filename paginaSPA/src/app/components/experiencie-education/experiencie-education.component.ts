import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { Experiencie } from 'src/app/models/experiencie.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperiencieService } from 'src/app/services/experiencie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-experiencie-education',
  templateUrl: './experiencie-education.component.html',
  styleUrls: ['./experiencie-education.component.css']
})
export class ExperiencieEducationComponent implements OnInit {
  public user? : User | undefined;
  // public experiencies : User["experiencies"] = [];
  // public educations : User["educations"] = [];
  public experiencies : Experiencie | any;
  public educations : Education | any;

  public addExperiencies : Experiencie | any;
  public editExperiencie : Experiencie | undefined;
  public deleteExperiencie : Experiencie | undefined;

  public addEducations : Education | any;
  public editEducation : Education | undefined;
  public deleteEducation : Education | undefined;

  loggedIn = false;

  constructor(
    private userService: UserService, 
    private experiencieService: ExperiencieService, 
    private educationService: EducationService, 
    private loginService:LoginService) 
    { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn() ) {
      this.getExperiencie();
      this.getEducation();
      this.loggedIn = true;
    } else {
      this.getUserHome();
      this.loggedIn = false;
    }
  }

  public getUserHome(): void {
    this.userService.getUserAdmin().subscribe( {
      next: (user: any) => {
        this.user = user;
        this.experiencies = this.user?.experiencies;
        this.educations = this.user?.educations;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getExperiencie(user?: User): void {
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
        this.experiencies = this.user?.experiencies;
        // this.experiencies = Object.values(response.experiencies);
        //console.log(this.experiencies)
      },
      error: (error: HttpErrorResponse) => {
        //console.log('error');
        alert(error.message);
      },
    });
  }

  public getEducation(user?: User): void {
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
        this.educations = this.user?.educations;
        // this.educations = Object.values(response.educations);
        // console.log(this.educations);
      },
      error: (error: HttpErrorResponse) => {
        // console.log('error');
        alert(error.message);
      },
    });
  }

  public openModalExp(mode: string, experiencie?: Experiencie) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addExperiencieModal');
    } else if(mode === 'edit') {
      this.editExperiencie = experiencie;
      button.setAttribute('data-target', '#editExperiencieModal');
    } else if(mode === 'delete') {
      this.deleteExperiencie = experiencie;
      button.setAttribute('data-target', '#deleteExperiencieModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public openModalEdu(mode: string, education?: Education) : void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add') {
        button.setAttribute('data-target', '#addEducationModal');
      } else if(mode === 'edit') {
        this.editEducation = education;
        button.setAttribute('data-target', '#editEducationModal');
      } else if(mode === 'delete') {
        this.deleteEducation = education;
        button.setAttribute('data-target', '#deleteEducationModal');
      }
      container?.appendChild(button);
      button.click();
  }

  public addExperiencie(addFormExp: NgForm): void {
    let experiencieTemp = addFormExp.value;
    // this.user?.experiencies.push(addFormExp.value);
    this.experiencieService.addExperiencie(this.user?.id, experiencieTemp).subscribe({
      next: (response: Experiencie) => {
        this.getExperiencie();
        addFormExp.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addFormExp.reset();
      }
    })
  }  

  public updateExperiencie(experiencie: Experiencie): void {
    let editExperiencie = experiencie;
    let idEx = editExperiencie.idExp;
    let {idExp , ...updatedExperiencie} = editExperiencie;
    this.experiencieService.updateExperiencie(this.user?.id, idEx, updatedExperiencie).subscribe({
      next: (response: Experiencie) => {
        this.getExperiencie();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteExperiencie(idExp: number): void {
    this.experiencieService.deleteExperiencie(this.user?.id, idExp).subscribe({
      next: (response: void) => {
        alert("La experiencia ha sido eliminada.");
        this.getExperiencie();
      },
      error: (error: HttpErrorResponse) => {
        this.getExperiencie();
      },
    });
  }

  public addEducation(addFormEdu: NgForm): void {
    let educationTemp = addFormEdu.value;
    // this.user?.educations.push(addFormEdu.value);
    this.educationService.addEducation(this.user?.id, educationTemp).subscribe({
      next: (response: Education) => {
        this.getEducation();
        addFormEdu.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addFormEdu.reset();
      }
    })
  }  

  public updateEducation(education: Education): void {
    let editEducation = education;
    let idEd = editEducation.idEdu;
    //console.log(idP)
    let {idEdu , ...updatedEducation} = editEducation;
    this.educationService.updateEducation(this.user?.id, idEd, updatedEducation).subscribe({
      next: (response: Education) => {
        this.getEducation();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteEducation(idEdu: number): void {
    this.educationService.deleteEducation(this.user?.id, idEdu).subscribe({
      next: (response: void) => {
        alert("La educación ha sido eliminada.");
        this.getEducation();
      },
      error: (error: HttpErrorResponse) => {
        this.getEducation();
      },
    });
  }

}
