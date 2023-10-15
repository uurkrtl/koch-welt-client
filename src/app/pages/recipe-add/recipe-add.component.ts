import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  recipeAddForm : FormGroup;
  errorMessage: string="";
  successMessage: string="";
  categories: Category[] = [];

  constructor(private formBuilder:FormBuilder, private recipeService:RecipeService, private categoryService:CategoryService){}

  ngOnInit(): void {
    this.createRecipeAddForm();
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response
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

}