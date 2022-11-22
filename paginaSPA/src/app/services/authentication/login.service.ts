import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";
  apiServerUrl = environment.apiLocalUrl;

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

    //  GENERATE TOKEN
    public generateToken(loginData:any){
      return this.http.post(`${this.apiServerUrl}/generate-token`,loginData);
    }

    public getCurrentUser(){
      return this.http.get(`${this.apiServerUrl}/current-user`);
    }
  
    // LOGIN Y ADD TOKEN IN LOCALSTORAGE
    public loginUserLogin(token:any){
      localStorage.setItem('token',token);
      return true;
    }
  
    public isLoggedIn(){
      let tokenStr = localStorage.getItem('token');
      if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
        return false;
      }else{
        return true;
      }
    }
  
    // LOG OUT Y DELETE TOKEN OF LOCALSTORAGE
    public logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }
  
    // GET TOKEN
    public getToken(){
      return localStorage.getItem('token');
    }
  
    public setUser(user:any){
      localStorage.setItem('user', JSON.stringify(user));
    }
  
    public getUserLogin(){
      let userStr = localStorage.getItem('user');
      if(userStr != null){
        return JSON.parse(userStr);
      }else{
        this.logout();
        return null;
      }
    }
  
    public getUserRole(){
      let user = this.getUserLogin();
      return user.authorities[0].authority;
    }

    public addUserlogin(user:any){
      console.log(user)
      return this.http.post(`${this.apiServerUrl}/users/`,user);
    }


    
}
