import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HeadingComponent } from './components/heading/heading.component';
import { FooterComponent } from './components/footer/footer.component';
import { LatestRecipesComponent } from './dataComponents/latest-recipes/latest-recipes.component';
import { PopularRecipesComponent } from './dataComponents/popular-recipes/popular-recipes.component';
import { LatestArticlesComponent } from './dataComponents/latest-articles/latest-articles.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeTemplateComponent } from './dataComponents/recipe-template/recipe-template.component';
import { LoginComponent } from './pages/login/login.component';
import { RecipeAddComponent } from './pages/recipe-add/recipe-add.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BannerComponent } from './components/banner/banner.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRecipeListComponent } from './pages/admin/admin-recipe/admin-recipe-list/admin-recipe-list.component';
import { AdminRecipeUpdateComponent } from './pages/admin/admin-recipe/admin-recipe-update/admin-recipe-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    HeadingComponent,
    FooterComponent,
    LatestRecipesComponent,
    PopularRecipesComponent,
    LatestArticlesComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeTemplateComponent,
    LoginComponent,
    RecipeAddComponent,
    BannerComponent,
    ArticleDetailComponent,
    ArticlesComponent,
    AdminComponent,
    AdminRecipeListComponent,
    AdminRecipeUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
