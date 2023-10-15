import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles:Article[] = [];
  orderBy:string = "insertionDate";
  limit: number = 0;

  articlesPopular: Article[] = [];
  orderByPopular:string = "readCount";
  limitPopular: number = 5;

  constructor(private articleService:ArticleService){}

  ngOnInit(): void {
    this.getArticles(this.orderBy,this.limit);
    this.getPopularArticles(this.orderByPopular,this.limitPopular)
  }

  getArticles(orderBy:string, limit:number){
    this.articleService.getArticles(orderBy,limit).subscribe(response=>{
        this.articles = response;
    })
  }

  getPopularArticles(orderBy:string, limit:number){
    this.articleService.getArticles(orderBy,limit).subscribe(response=>{
        this.articlesPopular = response;
    })
  }

}