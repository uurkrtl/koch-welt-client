import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://localhost:8080/api/";


  constructor(private httpClient: HttpClient) { }

  getCategories():Observable<Category[]>{
    let newPath = this.apiUrl+"categories"
    return this.httpClient.get<Category[]>(newPath)
  }

}
