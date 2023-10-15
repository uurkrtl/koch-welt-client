import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article;
  articleId:number;
  dataLoaded = false;

  articleTitle: string;
  articleImageUrl: string;
  articleDescription: string;
  articleUserImageUrl: string;
  articleUserFirstName: string;
  articleUserLastName: string;

  constructor(private route:ActivatedRoute, private articleService:ArticleService){}

  ngOnInit(): void {
    this.articleId=this.route.snapshot.queryParamMap.get('articleId') as unknown as number;
    this.getArticleById(this.articleId);
    this.readCounter(this.articleId);

  }

  getArticleById(articleId:number){
    this.articleService.getArticleById(articleId).subscribe(response=>{
        this.articleTitle = response.title;
        this.articleImageUrl = response.imageUrl;
        this.articleDescription = response.description;
        this.articleUserImageUrl = response.userImageUrl;
        this.articleUserFirstName = response.userFirstName;
        this.articleUserLastName = response.userLastName;
        this.dataLoaded = true;
    })
  }

  readCounter(articleId:number){
    this.articleService.readCounter(articleId).subscribe(response=>{
      
    },responseError=>{
      console.log(responseError.error)
    });
  }

}