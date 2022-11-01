import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService:LoginService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    // console.log(authReq);
    const token = this.loginService.getToken();
    // console.log(authReq);
    if(token != null){
      authReq = authReq.clone({
        setHeaders : {authorization: `Bearer ${token}` }
      })
    }
    return next.handle(authReq);
  }

}

export const authInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }
]
