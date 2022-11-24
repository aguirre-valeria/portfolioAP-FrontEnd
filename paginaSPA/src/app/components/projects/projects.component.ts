import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public user? : User | undefined;
  public projects : Project | any;
  public editProject : Project | undefined;
  public deleteProject : Project | undefined;
  public username?: string | undefined | null;

  loggedIn = false;
  modelForm!: FormGroup;
  
  constructor(
    private projectService: ProjectService, 
    private userService: UserService, 
    private loginService:LoginService,
    private route: ActivatedRoute,
    formBuilder: FormBuilder) {
      this.modelForm = formBuilder.group({
        titleProj: ['', Validators.required],
        descriptionProj: ['', Validators.required],
        urlPhoto: ['', Validators.required],
        urlGitHubProj: ['', Validators.required],
        urlDemo: ['', Validators.required],
      })
     }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getProject();
      this.loggedIn = true;
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.username = params.get('username');
      });
      if(this.username === null) {
        this.getUserHome();
        this.loggedIn = false;
      } else {
        this.getUserByUsername(this.username);
        this.loggedIn = false;
      }
    }
  }

  public getUserHome(): void {
    this.userService.getUserAdmin().subscribe( {
      next: (user: any) => {
        this.user = user;
        this.projects = this.user?.projects;
      },
      error:(error:HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      }
    })
  }

  public getUserByUsername(username : string | null | undefined): void {
        this.userService.getUserByUserName(username).subscribe( {
          next: (user: any) => {
            this.user = user;
            this.projects = this.user?.projects;
          },
          error:(error:HttpErrorResponse) => {
            console.log(error.message);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Ha ocurrido un error!'
            })
          }
        })
      }

   public getProject(user?: User): void {
    this.loginService.getCurrentUser().subscribe( {
      next: (user: any) => {
        this.user = user;
        this.projects = this.user?.projects;
      },
      error:(error:HttpErrorResponse) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
      }
    })
  } 

  public openModal(mode: string, project?: Project) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addProjectModal');
    } else if(mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-target', '#editProjectModal');
    } else if(mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-target', '#deleteProjectModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public addProject(): void {
    this.projectService.addProject(this.user?.id, this.modelForm.value).subscribe({
      next: (response: Project) => {
        this.getProject();
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

  public updateProject(project: Project): void {
    let editProject = project;
    let idP = editProject.idProj;
    let {idProj , ...updatedProject} = editProject;
    this.projectService.updateProject(this.user?.id, idP, updatedProject).subscribe({
      next: (response: Project) => {
        this.getProject();
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

  public onDeleteProject(idProj: number): void {
    this.projectService.deleteProject(this.user?.id, idProj).subscribe({
      next: (response: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: '¡El proyecto ha sido eliminado!'
        })
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Ha ocurrido un error!'
        })
        this.getProject();
      },
    });
  }
}
