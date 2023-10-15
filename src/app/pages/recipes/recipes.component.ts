import { Component, OnInit  } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  recipes: Recipe[] = []
  categoryId: number;
  categoryName: string;
  dataLoaded = false;
  constructor(private route:ActivatedRoute, private recipeService:RecipeService){}

  ngOnInit(): void {
    this.categoryId=this.route.snapshot.queryParamMap.get('categoryId') as unknown as number;
    this.categoryName=this.route.snapshot.queryParamMap.get('categoryName') as string;
    this.getRecipesByCategory(this.categoryId);
  }

  getRecipesByCategory(categoryId:number){
    this.recipeService.getRecipesByCategory(categoryId).subscribe(response=>{
      this.recipes = response
      this.dataLoaded = true;
    })
  }

}
