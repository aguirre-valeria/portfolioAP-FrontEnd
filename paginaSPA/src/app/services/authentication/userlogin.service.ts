import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  apiServerUrl = "https://portfolio-web-ap.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }


}
