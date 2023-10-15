import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  recipes: Recipe[] = []
  limit: number = 6;
  orderBy:string = "insertionDate";
  
  constructor(private recipeService:RecipeService){}

  ngOnInit(): void {
    this.getRecipes(this.orderBy,this.limit);
  }

  getRecipes(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.recipes = response;
    })
  }

}