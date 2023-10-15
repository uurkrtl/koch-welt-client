import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeIngredientsService } from 'src/app/services/recipe-ingredients.service';
import { RecipeIngredients } from 'src/app/models/recipeIngredients';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  ingredients: RecipeIngredients[] = [];
  recipes: Recipe[] = [];
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

  recipeId: number;
  categoryId: number;
  dataLoaded = false;
  categories: Category[] = [];

  popularRecipes: Recipe[] = [];
  limitPopularRecipes: number = 4;
  orderByPopularRecipes:string = "readCount";

  latestRecipes: Recipe[] = [];
  limitLatestRecipes: number = 4;
  orderByLatestRecipes:string = "insertionDate";

  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private recipeIngredientsService:RecipeIngredientsService, private categoryService:CategoryService){}

  ngOnInit(): void {
    this.recipeId=this.route.snapshot.queryParamMap.get('recipeId') as unknown as number;
    this.categoryId=this.route.snapshot.queryParamMap.get('categoryId') as unknown as number;
    this.getRecipeByRecipeId(this.recipeId);
    this.getIngredientsByRecipeId(this.recipeId);
    this.getRecipesByCategory(this.categoryId);
    this.getCategories();
    this.getRecipesPopular(this.orderByPopularRecipes, this.limitPopularRecipes);
    this.getRecipesLatest(this.orderByLatestRecipes, this.limitLatestRecipes);
    this.readCounter(this.recipeId);
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
      this.dataLoaded = true;
    })
  }

  getIngredientsByRecipeId(recipeId:number){
    this.recipeIngredientsService.getIngredientsByRecipeId(recipeId).subscribe(response=>{
      this.ingredients = response
      this.dataLoaded = true;
    })
  }

  getRecipesByCategory(categoryId:number){
    this.recipeService.getRecipesByCategory(categoryId).subscribe(response=>{
      this.recipes = response
      this.dataLoaded = true;
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response
      this.dataLoaded = true;
    })
  }

  getRecipesPopular(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.popularRecipes = response
      this.dataLoaded = true;
    })
  }

  getRecipesLatest(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.latestRecipes = response
      this.dataLoaded = true;
    })
  }

  readCounter(recipeId:number){
    this.recipeService.readCounter(recipeId).subscribe(response=>{
      
    },responseError=>{
      console.log(responseError.error)
    });
  }

}