import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Category[] = [];
  userId: number;
  token: string;

  constructor(private categoryService:CategoryService, private authService:AuthService){}

  ngOnInit(): void {
    this.getCategories();
    this.token= localStorage.getItem("token");
    this.getUserId(this.token);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response
    })
  }

  getUserId(token:string){
    this.authService.getUserId(token).subscribe(response=>{
      this.userId = response as unknown as number
    })
  }

}