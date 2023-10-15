import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  popularRecipe: Recipe[] = [];
  latestRecipes: Recipe[] = [];
  limitPopular: number = 1;
  orderByPopular:string = "readCount";
  limitLatest: number = 2;
  orderByLatest:string = "insertionDate";

  constructor(private recipeService:RecipeService){}

  ngOnInit(): void {
    this.getRecipePopularOne(this.orderByPopular,this.limitPopular);
    this.getRecipesLatestTwo(this.orderByLatest,this.limitLatest);
  }

  getRecipePopularOne(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.popularRecipe = response;
    })
  }

  getRecipesLatestTwo(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.latestRecipes = response;
    })
  }

}