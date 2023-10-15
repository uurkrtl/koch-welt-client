import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrls: ['./latest-articles.component.css']
})
export class LatestArticlesComponent implements OnInit {
  articles: Article[] = [];
  limit: number = 3;
  orderBy:string = "insertionDate";
  dataLoaded = false;

  constructor(private articleService:ArticleService){}

  ngOnInit(): void {
    this.getArticleLatest(this.orderBy, this.limit);
  }

  getArticleLatest(orderBy:string,limit:number){
    this.articleService.getArticles(orderBy, limit).subscribe(response=>{
      this.articles = response
      this.dataLoaded = true;
    })
  }

}