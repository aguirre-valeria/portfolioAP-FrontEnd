import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { Experiencie } from 'src/app/models/experiencie.model';
import { User } from 'src/app/models/user.model';
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
  public experiencies : User["experiencies"] = [];
  public educations : User["educations"] = [];

  public addExperiencies : Experiencie | any;
  public editExperiencie : Experiencie | undefined;
  public deleteExperiencie : Experiencie | undefined;

  public addEducation : Education | any;
  public editEducation : Education | undefined;
  public deleteEducation : Education | undefined;

  constructor(private userService: UserService, private experiencieService: ExperiencieService, private educationService: EducationService) { }

  ngOnInit(): void {
    this.getUser();
    this.getExperiencie();
    this.getEducation();
  }

  public getUser(): void {
    this.userService.getUser().subscribe( {
      next: (response: User) => {
        this.user = response;
        //console.log(this.user);
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  } 

  public getExperiencie(): void {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        this.experiencies = Object.values(response.experiencies);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public getEducation(): void {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        this.educations = Object.values(response.educations);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
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

  public onAddExperiencie(addFormExp: NgForm): void {
    this.user?.experiencies.push(addFormExp.value);
    this.experiencieService.addExperiencie(this.user).subscribe({
      next: (response: User) => {
        this.getExperiencie();
        addFormExp.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addFormExp.reset();
      }
    })
  }  

  public onUpdateExperiencie(experiencie: Experiencie): void {
    this.experiencieService.updateExperiencie(experiencie).subscribe({
      next: (response: Experiencie) => {
        this.getExperiencie();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteExperiencie(idExp: number): void {
    this.experiencieService.deleteExperiencie(idExp).subscribe({
      next: (response: void) => {
        alert("La experiencia ha sido eliminada.");
        this.getExperiencie();
      },
      error: (error: HttpErrorResponse) => {
        this.getExperiencie();
      },
    });
  }

  public onAddEducation(addFormEdu: NgForm): void {
    this.user?.educations.push(addFormEdu.value);
    this.educationService.addEducation(this.user).subscribe({
      next: (response: User) => {
        this.getEducation();
        addFormEdu.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addFormEdu.reset();
      }
    })
  }  

  public onUpdateEducation(education: Education): void {
    this.editEducation = education;
    this.educationService.updateEducation(education).subscribe({
      next: (response: Education) => {
        this.getEducation();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteEducation(idEdu: number): void {
    this.educationService.deleteEducation(idEdu).subscribe({
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
