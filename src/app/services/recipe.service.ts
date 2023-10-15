import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  apiUrl = "http://localhost:8080/api/";
  newPathRecipe: string;

  constructor(private httpClient: HttpClient) { }

  getRecipes(orderBy:string,limit:number):Observable<Recipe[]>{
    this.newPathRecipe = this.apiUrl+"recipes?orderBy="+orderBy+"&limit="+limit
    if(limit == 0){
      this.newPathRecipe = this.apiUrl+"recipes?orderBy="+orderBy
    }
    return this.httpClient.get<Recipe[]>(this.newPathRecipe)
    
  }

  getRecipesByCategory(categoryId:number):Observable<Recipe[]>{
    let newPath = this.apiUrl+"recipes?categoryId="+categoryId
    return this.httpClient.get<Recipe[]>(newPath)
  }

  getRecipeByRecipeId(recipeId:number):Observable<Recipe>{
    let newPath = this.apiUrl+"recipes/"+recipeId
    return this.httpClient.get<Recipe>(newPath)
  }

  add(recipe:Recipe){
    return this.httpClient.post(this.apiUrl+"recipes/add",recipe)
  }

  update(recipe:Recipe){
    return this.httpClient.put(this.apiUrl+"recipes/update",recipe)
  }

  delete(recipeId:number){
    return this.httpClient.put(this.apiUrl+"recipes/delete?id="+recipeId,recipeId)
  }

  readCounter(recipeId:number){
    return this.httpClient.put(this.apiUrl+"recipes/readCounter?id="+recipeId,recipeId)
  }

}