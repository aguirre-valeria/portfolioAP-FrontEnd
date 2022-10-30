import { Project } from './../../models/project.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public user? : User | undefined;
  public projects : User["projects"] = [];
  public addProjects: Project | any;
  public editProject : Project | undefined;
  public deleteProject : Project | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.getProject();
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

  public getProject(): void {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        this.projects = Object.values(response.projects);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
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

  public addProject(addForm: NgForm): void {
    this.user?.projects.push(addForm.value);
    this.userService.addProject(this.user).subscribe({
      next: (response: User) => {
        this.getProject();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }  

  public updateProject(project: Project): void {
    this.editProject = project;
    this.userService.updateProject(project).subscribe({
      next: (response: Project) => {
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteProject(idProj: number): void {
    this.userService.deleteProject(idProj).subscribe({
      next: (response: void) => {
        alert("El proyecto ha sido eliminado.");
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        this.getProject();
      },
    });
  }
}
