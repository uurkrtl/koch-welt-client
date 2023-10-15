import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:8080/api/auth/";
  constructor(private httpClient:HttpClient) { }

  login(login:Login){
    return this.httpClient.post(this.apiUrl+"login",login, { responseType: 'text' })
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  getUserId(token:string){
    let newPath = this.apiUrl+"getId?token="+token
    return this.httpClient.get(newPath)
  }

}