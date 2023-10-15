import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { CategoryService } from 'src/app/services/category.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Category } from 'src/app/models/category';
import { RecipeIngredientsService } from 'src/app/services/recipe-ingredients.service';

@Component({
  selector: 'app-admin-recipe-list',
  templateUrl: './admin-recipe-list.component.html',
  styleUrls: ['./admin-recipe-list.component.css']
})
export class AdminRecipeListComponent implements OnInit {

  recipeId: number;
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
  recipeActive: boolean;
  userImageUrl: string;
  userId: number;
  userFirstName: string;
  userLastName: string;

  recipeAddForm: FormGroup;
  recipeUpdateForm: FormGroup;
  recipeIngredientAddForm: FormGroup;
  errorMessage: string="";
  successMessage: string="";
  categories: Category[] = [];

  recipes: Recipe[] = [];
  limit: number = 0;
  orderBy:string = "insertionDate";
  currentRecipe: Recipe;
  updateForm: boolean = false;
  addForm: boolean = false;
  deleteConfirm: boolean = false;
  selectedRecipeId: number;

  ingredients: Ingredient[];
  ingredientForm: boolean = false;
  recipeIngredientForm: boolean = false;
  currentIngredient: Ingredient;

  constructor(private formBuilder:FormBuilder, private recipeService:RecipeService, private categoryService:CategoryService, private ingredientService:IngredientService, private recipeIngredientsService: RecipeIngredientsService){}

  ngOnInit(): void {
    this.getRecipes(this.orderBy,this.limit);
    this.createRecipeAddForm();
    this.createRecipeUpdateForm();
    this.getCategories();
    this.createRecipeIngredientAddForm();
  }

  getRecipes(orderBy:string,limit:number){
    this.recipeService.getRecipes(orderBy,limit).subscribe(response=>{
      this.recipes = response;
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response
    })
  }

  getIngredients(){
    this.ingredientService.getIngredients().subscribe(response=>{
      this.ingredients = response
    })
  }

  createRecipeAddForm(){
    this.recipeAddForm = this.formBuilder.group({
      name: ["",Validators.required],
      preparation: ["",Validators.required],
      preparationTime: ["",Validators.required],
      bakingTime: ["",Validators.required],
      imageUrl: ["",Validators.required],
      userId: ["",Validators.required],
      categoryId: ["",Validators.required]      
    })
  }

  createRecipeUpdateForm(){
    this.recipeUpdateForm = this.formBuilder.group({
      id: ["",Validators.required],
      name: ["",Validators.required],
      preparation: ["",Validators.required],
      preparationTime: ["",Validators.required],
      bakingTime: ["",Validators.required],
      imageUrl: ["",Validators.required],
      categoryId: ["",Validators.required],
      active: ["",Validators.required]

    })
  }

  createRecipeIngredientAddForm(){
    this.recipeIngredientAddForm = this.formBuilder.group({
      recipeId: ["",Validators.required],
      ingredientId: ["",Validators.required],
      unit: ["",Validators.required],
      amount: ["",Validators.required]
    })
  }

  add(){
    if(this.recipeAddForm.valid){
      let recipeModel = Object.assign({},this.recipeAddForm.value)
      this.recipeService.add(recipeModel).subscribe(response=>{
        console.log(this.recipeAddForm.value)
        console.log(response)
        this.errorMessage=""
        this.successMessage="The recipe has been successfully added"
      },responseError=>{
        this.errorMessage=responseError.error.message
        console.log(this.errorMessage)
        this.successMessage=""
      })
    }else{
      console.log("Could not add recipe")
    }
  }

  recipeIngredientsAdd(){
    if(this.recipeIngredientAddForm.valid){
      let recipeIngredientModel = Object.assign({},this.recipeIngredientAddForm.value)
      this.recipeIngredientsService.add(recipeIngredientModel).subscribe(response=>{
        console.log(this.recipeIngredientAddForm.value)
        console.log(response)
        this.errorMessage=""
        this.successMessage="The ingredient has been successfully added"
      },responseError=>{
        this.errorMessage=responseError.error.message
        console.log(this.errorMessage)
        this.successMessage=""
      })
    }else{
      console.log("Could not add ingredient")
    }
  }

  update(){
    if(this.recipeUpdateForm.valid){
      this.recipeUpdateForm.patchValue({id: this.recipeId})
      let recipeModel = Object.assign({},this.recipeUpdateForm.value)
      this.recipeService.update(recipeModel).subscribe(response=>{
        console.log(this.recipeUpdateForm.value)
        console.log(response)
        this.errorMessage=""
        this.successMessage="The recipe has been successfully updated"
      },responseError=>{
        this.errorMessage=responseError.error.message
        console.log(this.errorMessage)
        this.successMessage=""
      })
    }else{
      console.log("Could not update recipe")
    }
    window.location.reload();
  }

  delete(recipeId:number){
    this.recipeService.delete(recipeId).subscribe(response=>{
      
    },responseError=>{
      console.log(responseError.error)
    });

    window.location.reload();
  }

  getRecipeByRecipeId(recipeId:number){
    this.recipeService.getRecipeByRecipeId(recipeId).subscribe(response=>{
      this.recipeId = response.id;
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
      this.recipeActive = response.active;
      this.userId = response.userId;
      this.userImageUrl = response.userImageUrl;
      this.userFirstName = response.userFirstName;
      this.userLastName = response.userLastName;
    })
  }


  getCurrentRecipeClass(recipe:Recipe){
    if(recipe==this.currentRecipe){
      return "list-group-item list-group-item-action active py-3 lh-sm"
    }else{
      return "list-group-item list-group-item-action py-3 lh-sm"
    }
  }

  setCurrentCategory(recipe:Recipe){
    this.currentRecipe = recipe;
    this.updateForm = true;
    this.addForm = false;
    this.deleteConfirm = false;
    this.recipeIngredientForm = false;
    this.selectedRecipeId = recipe.id;
    this.getRecipeByRecipeId(this.selectedRecipeId);
  }

  getUpdateFormClass(){
    if(this.updateForm){
      return "container mt-3"
    }else{
      return "d-none container mt-3"
    }
  }

  getAddFormClass(){
    if(this.addForm){
      return "container mt-3"
    }else{
      return "d-none container mt-3"
    }
  }

  getDeleteConfirmationClass(){
    if(this.deleteConfirm){
      return "container mt-5"
    }else{
      return "d-none container mt-5"
    }
  }

  getIngredientFormClass(){
    if(this.ingredientForm){
      return "container mt-3"
    }else{
      return "d-none container mt-3"
    }
  }

  getRecipeIngredientFormClass(){
    if(this.recipeIngredientForm){
      return "container mt-3"
    }else{
      return "d-none container mt-3"
    }
  }

  getAddForm(){
    this.updateForm = false;
    this.currentRecipe = null;
    this.addForm = true;
    this.deleteConfirm = false;
    this.ingredientForm = false;
    this.recipeIngredientForm = false;
  }

  getUpdateForm(){
    this.updateForm = true;
    this.addForm = false;
    this.deleteConfirm = false;
    this.ingredientForm = false;
    this.recipeIngredientForm = false;
  }

  getDeleteForm(){
    this.updateForm = false;
    this.addForm = false;
    this.deleteConfirm = true;
    this.ingredientForm = false;
    this.recipeIngredientForm = false;
  }

  getIngredientForm(){
    this.getIngredients();
    this.updateForm = false;
    this.addForm = false;
    this.deleteConfirm = false;
    this.ingredientForm = true;
    this.recipeIngredientForm = false;
  }

  getRecipeIngredientForm(currentIngredient:Ingredient){
    this.currentIngredient = currentIngredient;
    this.updateForm = false;
    this.addForm = false;
    this.deleteConfirm = false;
    this.ingredientForm = false;
    this.recipeIngredientForm = true;
  }

}