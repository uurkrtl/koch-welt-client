import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-recipe-update',
  templateUrl: './admin-recipe-update.component.html',
  styleUrls: ['./admin-recipe-update.component.css']
})
export class AdminRecipeUpdateComponent implements OnInit {

  recipeName: string;
  recipeImageUrl: string;
  recipeBakingTime: number;
  recipeReadCount: number;
  recipePreparationTime: number;
  recipeInsertionDate: Date;
  recipeUpdateDate: Date;
  recipePreparation: string;
  recipeCategoryName: string;
  recipeCategoryId: number;
  userImageUrl: string;
  userFirstName: string;
  userLastName: string;


  recipes: Recipe[] = []
  limit: number = 0;
  orderBy: string = "insertionDate";
  currentRecipeId: number;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService){}

  ngOnInit(): void {
    this.currentRecipeId=this.route.snapshot.queryParamMap.get('recipeId') as unknown as number;
    this.getRecipes(this.orderBy,this.limit);
  }

  getRecipes(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.recipes = response;
    })
  }

  getRecipeByRecipeId(recipeId:number){
    this.recipeService.getRecipeByRecipeId(recipeId).subscribe(response=>{
      this.recipeName = response.name;
      this.recipeImageUrl = response.imageUrl;
      this.recipeBakingTime = response.bakingTime;
      this.recipePreparationTime = response.preparationTime;
      this.recipeReadCount = response.readCount;
      this.recipeInsertionDate = response.insertionDate;
      this.recipePreparation = response.preparation;
      this.recipeUpdateDate = response.updateDate;
      this.recipeCategoryName = response.categoryName;
      this.recipeCategoryId = response.categoryId;
      this.userImageUrl = response.userImageUrl;
      this.userFirstName = response.userFirstName;
      this.userLastName = response.userLastName;
    })
  }

  getCurrentCategoryClass(recipeId:number){
    if(recipeId==this.currentRecipeId){
      return "list-group-item list-group-item-action active py-3 lh-sm"
    }else{
      return "list-group-item list-group-item-action py-3 lh-sm"
    }
  }

}