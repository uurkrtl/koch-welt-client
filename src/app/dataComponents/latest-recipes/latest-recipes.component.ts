import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-latest-recipes',
  templateUrl: './latest-recipes.component.html',
  styleUrls: ['./latest-recipes.component.css']
})
export class LatestRecipesComponent implements OnInit{

  recipes: Recipe[] = []
  limit: number = 6;
  orderBy:string = "insertionDate";
  dataLoaded = false;
  constructor(private recipeService:RecipeService){}

  ngOnInit(): void {
    this.getRecipes(this.orderBy,this.limit);
  }

  getRecipes(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.recipes = response
      this.dataLoaded = true;
    })
  }

}