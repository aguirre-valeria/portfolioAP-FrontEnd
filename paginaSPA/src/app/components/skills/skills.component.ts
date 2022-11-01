import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/models/skill.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public user?: User | undefined;
  public skills: User["skills"] = [];
  public addSkills: Skill | any;
  public editSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;

  constructor(private skillService: SkillService, private userService: UserService, private loginService:LoginService) { }

  ngOnInit(): void {
    // this.getUser();
    this.getSkillByUser();
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
    this.userService.getUser().subscribe({
      next: (response: User) => {
        this.user = response;
        //console.log(this.user);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  } */

  public getSkillByUser(): void {
    this.skillService.getUser().subscribe({
      next: (response: User) => {
        this.skills = Object.values(response.skills);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public openModal(mode: string, skill?: Skill): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal');
    } else if (mode === 'edit') {
      this.editSkill = skill;
      // console.log(this.editSkill);
      button.setAttribute('data-target', '#editSkillModal');
    } else if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public addSkill(addForm: NgForm): void {
    this.user?.skills.push(addForm.value);
    this.skillService.addSkill(this.user).subscribe({
      next: (response: User) => {
        this.getSkillByUser();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public updateSkill(skill: Skill): void {
    this.editSkill = skill;
    // console.log(this.editSkill);
    this.skillService.updateSkill(skill).subscribe({
      next: (response: Skill) => {
        this.getSkillByUser();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteSkill(idSkill: number): void {
    this.skillService.deleteSkill(idSkill).subscribe({
      next: (response: void) => {
        alert("La habilidad ha sido eliminada.");
        this.getSkillByUser();
      },
      error: (error: HttpErrorResponse) => {
        this.getSkillByUser();
      },
    });
  }

}
