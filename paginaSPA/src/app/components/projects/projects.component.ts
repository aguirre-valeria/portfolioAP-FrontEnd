import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project.service';
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
  
  constructor(private projectService: ProjectService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.getProjectByUser();
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

  public getProjectByUser(): void {
    this.projectService.getUser().subscribe({
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
    this.projectService.addProject(this.user).subscribe({
      next: (response: User) => {
        this.getProjectByUser();
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
    this.projectService.updateProject(project).subscribe({
      next: (response: Project) => {
        this.getProjectByUser();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteProject(idProj: number): void {
    this.projectService.deleteProject(idProj).subscribe({
      next: (response: void) => {
        alert("El proyecto ha sido eliminado.");
        this.getProjectByUser();
      },
      error: (error: HttpErrorResponse) => {
        this.getProjectByUser();
      },
    });
  }
}
