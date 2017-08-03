import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


/*
  Generated class for the ArticlesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ArticlesProvider {

  private url = 'http://dev-drupal-ionic-example.pantheonsite.io/jsonapi/node/article';
  articles : SimpleArticle[];

  constructor(public http: Http) {
  }

  loadAllArticles() : any {
    let sort = 'sort=-nid';
    let headers = new Headers();
    return this.http.get(this.url + '?' + sort).map(res => {
      let response = res.json();
      response.data.forEach((element) => {
        this.articles.push(new SimpleArticle(element.attributes.uuid, element.attributes.title, element.attributes.body.value));
      });
    });
  }

  load(refresh?: boolean) {
    if(this.articles && !refresh) {
      return Observable.of(this.articles);
    } else {
      this.articles = [];
      return this.loadAllArticles();
    }
  }

  addArticle(title: string, body: string) : any {
    let headers = new Headers();
    headers.append("Accept", 'application/vnd.api+json');
    headers.append('Content-Type', 'application/vnd.api+json' );

    let options = new RequestOptions({ headers: headers });
    
    let request =  {
        'data' : {
        'type' : 'node--article',
        'attributes' : {
          'title' : title,
          'body' : {
            'value' : body,
            'format' : 'plain_text'
          }
        }
      }
    }

    this.http.post(this.url, JSON.stringify(request), options)
      .subscribe( res => {
        console.log(res);
      });
  }

  removeArticle(nid: string) {
    let headers = new Headers();
    headers.append("Accept", 'application/vnd.api+json');
    headers.append('Content-Type', 'application/vnd.api+json' );
    headers.append('Authorization', 'YXBpOmFwaQ==');
    let options = new RequestOptions({ headers: headers });
    this.http.delete(this.url + '/' + nid, options).subscribe(res => { console.log(res); });
  }

  editArticle(nid: string, title: string, body: string) {
    let headers = new Headers();
    let request = {
      'data' : {
        'id' : nid,
        'attributes' : {
          'title' : title,
          'body' : body
        }
      }
    }
    
    headers.append("Accept", 'application/vnd.api+json');
    headers.append('Content-Type', 'application/vnd.api+json' );
    headers.append('Authorization', 'YXBpOmFwaQ==');
    headers.append('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PATCH,DELETE');

    let options = new RequestOptions({ headers: headers });
    this.http.patch(this.url + '/' + nid, JSON.stringify(request), options).subscribe(res => { console.log(res); });
  }

  getArticle(nid: string) {
    let  article = this.articles.filter(val => nid == val.nid);
    return article[0];
  }
}

class SimpleArticle {
  title: string;
  body: string;
  nid: string;

  constructor(nid: string, title: string, body: string) {
    this.nid = nid;
    this.title = title;
    this.body = body;
  }
}