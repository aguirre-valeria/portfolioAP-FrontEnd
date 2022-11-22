import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/authentication/login.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public user? : User | undefined;
  public projects : Project | any;
  public addProjects: Project | any;
  public editProject : Project | undefined;
  public deleteProject : Project | undefined;
  // public userId : User["id"] | undefined;<

  loggedIn = false;
  public username?: string | undefined | null;
  
  constructor(
    private projectService: ProjectService, 
    private userService: UserService, 
    private loginService:LoginService,
    private route: ActivatedRoute) { }

  // isloged = () => this.autenticacionService.loggedIn();

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.getProject();
      this.loggedIn = true;
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.username = params.get('username');
      });
      if(this.username === null) {
        // console.log(this.username)
        this.getUserHome();
        this.loggedIn = false;
      } else {
        this.getUserByUsername(this.username);
        this.loggedIn = false;
        // console.log(this.username)
      }
      
    }
    // this.getProject();
/*     this.getProjectByUser(); */
  }

  public getUserHome(): void {
    this.userService.getUserAdmin().subscribe( {
      next: (user: any) => {
        this.user = user;
        this.projects = this.user?.projects;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getUserByUsername(username : string | null | undefined): void {
    /*     let userN = username;
        console.log(this.username); */
        this.userService.getUserByUserName(username).subscribe( {
          next: (user: any) => {
            this.user = user;
            this.projects = this.user?.projects;
          },
          error:(error:HttpErrorResponse) => {
            alert(error.message);
          }
        })
      }

   public getProject(user?: User): void {
    //console.log(this.user)
    this.loginService.getCurrentUser().subscribe( {
      next: (user: any) => {
        this.user = user;
        // console.log(this.user)
        this.projects = this.user?.projects;
        // console.log(this.projects);
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  } 

/*    public getUser(): void {
    this.userService.getUser().subscribe( {
      next: (response: User) => {
        this.user = response;
        //console.log(this.user);
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }  */

  /* public getProjectByUser(): void {
    this.projectService.getUser(this.user?.id).subscribe({
      next: (response: User) => {
        console.log(response)
        this.projects = Object.values(response.projects);
        console.log(this.projects)
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  } */

  public openModal(mode: string, project?: Project) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addProjectModal');
    } else if(mode === 'edit') {
      // this.editProject = this.projects;
      this.editProject = project;
      // console.log(this.editProject)
      button.setAttribute('data-target', '#editProjectModal');
    } else if(mode === 'delete') {
      this.deleteProject = project;
      // this.deleteProject = this.projects;
      button.setAttribute('data-target', '#deleteProjectModal');
    }
    container?.appendChild(button);
    button.click();
  }

/*   public addProject(addForm: NgForm): void {
    this.user?.projects.push(addForm.value);
    this.projectService.addProject(this.user).subscribe({
      next: (response: User) => {
        this.getProject();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }  */ 

  public addProject(addForm: NgForm): void {
    let projectTemp = addForm.value;
    // console.log(projectTemp)
    // console.log(this.user?.id)
    this.projectService.addProject(this.user?.id, projectTemp).subscribe({
      next: (response: Project) => {
        this.getProject();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

/*   public updateProject(project: Project): void {
    this.editProject = project;
    this.projectService.updateProject(project).subscribe({
      next: (response: Project) => {
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  } */

  public updateProject(project: Project): void {
    let editProject = project;
    //console.log(editProject)
    let idP = editProject.idProj;
    //console.log(idP)
    let {idProj , ...updatedProject} = editProject;
    //console.log(updatedProject)

    this.projectService.updateProject(this.user?.id, idP, updatedProject).subscribe({
      next: (response: Project) => {
        // console.log(response)
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteProject(idProj: number): void {
    this.projectService.deleteProject(this.user?.id, idProj).subscribe({
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
