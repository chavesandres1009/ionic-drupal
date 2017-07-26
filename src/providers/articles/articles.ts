import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ArticlesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ArticlesProvider {

  private url = 'http://dev-drupal-ionic-example.pantheonsite.io/jsonapi/node/article';
  public articles : SimpleArticle[] = [];

  constructor(public http: Http) {
    console.log('Hello ArticlesProvider Provider');
    this.loadArticles();
  }

  loadAllArticles() : any {
    return this.http.get(this.url).map(res => res.json());
  }

  loadArticles() {
    let request = this.loadAllArticles().subscribe((data) => {
      data.data.forEach(element => {
        this.articles.push(new SimpleArticle(element.attributes.title, element.attributes.body.value));
      });
      console.log(this.articles);
    });
  }
}

class SimpleArticle {
  title: string;
  body: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}
