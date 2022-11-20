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

  public getUser(idUser? : number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/${idUser}`);
  }

/*   public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  } */

  public updateUser(user: User):Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update/${user.id}`, user);
  }
}
