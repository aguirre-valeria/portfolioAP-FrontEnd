import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public getUser(idUser? : number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/${idUser}`);
  }

  public addSkill(skill?: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, skill);
  }

  public updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiServerUrl}/skill/update`, skill);
  }

  public deleteSkill(idSkill: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/skill/delete/${idSkill}`);
  }
}
