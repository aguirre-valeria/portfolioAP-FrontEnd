import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";
  apiServerUrl = environment.apiLocalUrl;

  constructor(private http: HttpClient) { }
/* 
  public getUser(id?:number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/${id}`);
  } */

  public addProject(idUser?: number, project?: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiServerUrl}/user/${idUser}/projects/add`, project);
  }

  public updateProject(idUser?: number, idProj?: number, project?: Object): Observable<Project> {
    return this.http.put<Project>(`${this.apiServerUrl}/user/${idUser}/projects/update/${idProj}`, project);
  }

  public deleteProject(idUser?: number, idProj?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/${idUser}/projects/delete/${idProj}`);
  }
}
