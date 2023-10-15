import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-popular-recipes',
  templateUrl: './popular-recipes.component.html',
  styleUrls: ['./popular-recipes.component.css']
})
export class PopularRecipesComponent implements OnInit {

  recipes: Recipe[] = [];
  limit: number = 6;
  orderBy:string = "readCount";
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