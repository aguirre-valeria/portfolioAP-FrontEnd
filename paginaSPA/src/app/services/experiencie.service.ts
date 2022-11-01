import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Experiencie } from '../models/experiencie.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ExperiencieService {
  apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public addExperiencie(experiencie?: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, experiencie);
  }

  public updateExperiencie(experiencie?: Experiencie): Observable<Experiencie> {
    return this.http.put<Experiencie>(`${this.apiServerUrl}/experiencie/update`, experiencie);
  }

  public deleteExperiencie(idExp: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/experiencie/delete/${idExp}`);
  }
}
