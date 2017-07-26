import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return this.http.get(this.url).map(res => res.json());
  }

  addArticle(title: string, body: string) : any {
    let headers = new Headers();
    headers.append("Accept", 'application/vnd.api+json');
    headers.append('Content-Type', 'application/vnd.api+json' );

    let options = new RequestOptions({ headers: headers });
    
    let request = new ArticlesAddRequest(title, body);

    let postParams = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }

    console.log(request.getRequest());
    this.http.post(this.url, JSON.stringify(request.getRequest()), options)
      .subscribe( res => {
        console.log(res);
      });
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

class ArticlesAddRequest {
  title: string;
  body: string;
  type: string = 'node--article';

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }

  getRequest() {
    return {
      'data' : {
        'type' : this.type,
        'attributes' : {
          'title' : this.title,
          'body' : {
            'value' : this.body,
            'format' : 'plain_text'
          }
        }
      }
    }
  }
}
