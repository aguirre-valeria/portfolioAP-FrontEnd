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
  // apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";
  apiServerUrl = environment.apiLocalUrl;

  constructor(private http: HttpClient) { }

/*   public getUser(id?:number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/${id}`);
  } */

  public addExperiencie(idUser?: number, experiencie?: Experiencie): Observable<Experiencie> {
    return this.http.post<Experiencie>(`${this.apiServerUrl}/user/${idUser}/experiencies/add`, experiencie);
  }

  public updateExperiencie(idUser?: number, idExp?: number, experiencie?: Object): Observable<Experiencie> {
    return this.http.put<Experiencie>(`${this.apiServerUrl}/user/${idUser}/experiencies/update/${idExp}`, experiencie);
  }

  public deleteExperiencie(idUser?: number, idExp?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/${idUser}/experiencies/delete/${idExp}`);
  }
}
