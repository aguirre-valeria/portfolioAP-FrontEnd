import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Education } from '../models/education.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  // apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";
  apiServerUrl = environment.apiLocalUrl;

  constructor(private http: HttpClient) { }

  public getUser(id?:number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/${id}`);
  }

  public addEducation(idUser?: number, education?: Education): Observable<Education> {
    return this.http.post<Education>(`${this.apiServerUrl}/user/${idUser}/educations/add`, education);
  }

  public updateEducation(idUser?: number, idEdu?: number, education?: Object): Observable<Education> {
    return this.http.put<Education>(`${this.apiServerUrl}/user/${idUser}/educations/update/${idEdu}`, education);
  }

  public deleteEducation(idUser?: number, idEdu?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/${idUser}/educations/delete/${idEdu}`);
  }
}
