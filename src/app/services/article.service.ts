import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = "http://localhost:8080/api/";
  newpath:string;

  constructor(private httpClient: HttpClient) { }

  getArticles(orderBy:string, limit:number):Observable<Article[]>{
   this.newpath = this.apiUrl+"articles?orderBy="+orderBy+"&limit="+limit
    if(limit==0){
      this.newpath = this.apiUrl+"articles?orderBy="+orderBy
    }
    
    return this.httpClient.get<Article[]>(this.newpath)
  }

  getArticleById(articleId:number):Observable<Article>{
    let newPath = this.apiUrl+"articles/getById?id="+articleId
    return this.httpClient.get<Article>(newPath)
  }

  readCounter(articleId:number){
    return this.httpClient.put(this.apiUrl+"articles/readCounter?id="+articleId,articleId)
  }

}