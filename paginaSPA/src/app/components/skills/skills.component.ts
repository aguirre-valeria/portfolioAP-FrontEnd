import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Skill } from 'src/app/models/skill.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public user?: User | undefined;
  public skills: Skill | any;
  public editSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;
  public username?: string | undefined | null;

  loggedIn = false;
  modelForm!: FormGroup;

  constructor(
    private skillService: SkillService,
    private userService: UserService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    formBuilder: FormBuilder) {
    this.modelForm = formBuilder.group({
      nameSkill: ['', Validators.required],
      porcentageSkill: ['', [Validators.required, Validators.maxLength(3)]]
    })
  }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getSkill();
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
        this.skills = this.user?.skills;
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
        this.skills = this.user?.skills;
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

  public getSkill(user?: User): void {
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
        this.skills = this.user?.skills;
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
      button.setAttribute('data-target', '#editSkillModal');
    } else if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public addSkill(): void {
    this.skillService.addSkill(this.user?.id, this.modelForm.value).subscribe({
      next: (response: Skill) => {
        this.getSkill();
        this.modelForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
        this.modelForm.reset();
      }
    })
  }

  public updateSkill(skill: Skill): void {
    let editSkill = skill;
    let idS = editSkill.idSkill;
    let { idSkill, ...updatedSkill } = editSkill;
    this.skillService.updateSkill(this.user?.id, idS, updatedSkill).subscribe({
      next: (response: Skill) => {
        this.getSkill();
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

  public onDeleteSkill(idSkill: number): void {
    this.skillService.deleteSkill(this.user?.id, idSkill).subscribe({
      next: (response: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminada',
          text: '¡La habilidad ha sido eliminada!'
        })
        this.getSkill();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
        this.getSkill();
      },
    });
  }

}

//OBTENER EVENTO DE TECLADO PARA VALIDAR
/*   public onKeyUp(validatorsForm : any) {
    const failedInputs = document.querySelector('.invalid');
    const validInputs = document.querySelector('.valid')
    const submitButton = document.getElementById('add-skill-form');
    if(validatorsForm.nameSkill == '' || validatorsForm.nameSkill == null  || validatorsForm.nameSkill == undefined || validatorsForm.porcentageSkill == '' || validatorsForm.porcentageSkill == null  || validatorsForm.porcentageSkill == undefined){
      console.log(validatorsForm)
      failedInputs?.classList.remove('d-none');
    } else {
      validInputs?.classList.remove('d-none');
      submitButton?.removeAttribute('disabled')
      this.validatorsForm.nameSkill = ''
      this.validatorsForm.porcentageSkill = ''
    }
  } */