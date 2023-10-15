import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeIngredients } from '../models/recipeIngredients';

@Injectable({
  providedIn: 'root'
})
export class RecipeIngredientsService {
  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }
  
  getIngredientsByRecipeId(recipeId:number):Observable<RecipeIngredients[]>{
    let newPath = this.apiUrl+"recipeIngredients/"+recipeId
    return this.httpClient.get<RecipeIngredients[]>(newPath)
  }

  add(recipeIngredients: RecipeIngredients){
    return this.httpClient.post(this.apiUrl+"recipeIngredients/add",recipeIngredients)
  }

}
