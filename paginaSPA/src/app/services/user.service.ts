import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";
  apiServerUrl = environment.apiLocalUrl;

  constructor(private http: HttpClient) { }

  public getUserById(idUser? : number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/${idUser}`);
  }

  public getUserAdmin(): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/15`);
  }

/*   public getUserByUsername(): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/users/get/muela12`);
  } */

  public getUserByUserName(username? : String): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/${username}`);
  }

/*   public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  } */

  public updateUser(user: User):Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update/${user.id}`, user);
  }
}
