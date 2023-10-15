import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RecipeAddComponent } from './pages/recipe-add/recipe-add.component';
import { LoginGuard } from './guards/login.guard';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRecipeListComponent } from './pages/admin/admin-recipe/admin-recipe-list/admin-recipe-list.component';
import { AdminRecipeUpdateComponent } from './pages/admin/admin-recipe/admin-recipe-update/admin-recipe-update.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'home', component:HomeComponent },
  { path:'recipes', component:RecipesComponent },
  { path:'recipe-detail', component:RecipeDetailComponent },
  { path:'login', component:LoginComponent },
  { path:'recipe/add', component:RecipeAddComponent, canActivate:[LoginGuard] },
  { path:'articles', component:ArticlesComponent },
  { path:'article-detail', component:ArticleDetailComponent },
  { path:'admin', component:AdminComponent },
  { path:'admin/recipes', component:AdminRecipeListComponent },
  { path:'admin/recipe/update', component:AdminRecipeUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
