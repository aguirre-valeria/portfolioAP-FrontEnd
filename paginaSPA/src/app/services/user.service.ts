import { Project } from 'src/app/models/project.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/2`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public updateUser(user: User):Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  //PROJECTS
  public getProjects(): Observable<User["projects"]> {
    return this.http.get<User["projects"]>(`${this.apiServerUrl}/user/id/2`);
  }

  public addProject(project?: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, project);
  }

  public updateProject(project: Project):Observable<Project> {
    return this.http.put<Project>(`${this.apiServerUrl}/project/update`, project);
  }

  public deleteProject(idProj: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/project/delete/${idProj}`);
  }
}
