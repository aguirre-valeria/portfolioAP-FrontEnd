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
  apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public getUser(id?:number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/${id}`);
  }

  public addProject(project?: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/users/up`, project);
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiServerUrl}/project/update`, project);
  }

  public deleteProject(idProj: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/project/delete/${idProj}`);
  }
}
