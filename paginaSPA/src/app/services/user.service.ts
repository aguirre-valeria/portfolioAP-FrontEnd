import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiServerUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/2`);
  }

  public updateUser(user: User):Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }
}
