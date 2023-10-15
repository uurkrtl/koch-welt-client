import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  apiUrl = "http://localhost:8080/api/";
  newpath:string;

  constructor(private httpClient: HttpClient) { }

  getIngredients():Observable<Ingredient[]>{
    this.newpath = this.apiUrl+"ingredients";     
     return this.httpClient.get<Ingredient[]>(this.newpath)
   }

}
