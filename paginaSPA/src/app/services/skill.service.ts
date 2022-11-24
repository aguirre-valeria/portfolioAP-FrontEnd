import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  // apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";
  apiServerUrl = environment.apiLocalUrl;

  constructor(private http: HttpClient) { }

  public addSkill(idUser?: number, skill?: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiServerUrl}/user/${idUser}/skills/add`, skill);
  }

  public updateSkill(idUser?: number, idSkill?: number, skill?: Object): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiServerUrl}/user/${idUser}/skills/update/${idSkill}`, skill);
  }

  public deleteSkill(idUser?: number, idSkill?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/${idUser}/skills/delete/${idSkill}`);
  }
}
