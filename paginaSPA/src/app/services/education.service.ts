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
  apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public addEducation(education?: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, education);
  }

  public updateEducation(education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.apiServerUrl}/education/update`, education);
  }

  public deleteEducation(idEdu: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/education/delete/${idEdu}`);
  }
}
