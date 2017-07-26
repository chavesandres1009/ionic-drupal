import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ArticlesProvider } from '../../providers/articles/articles';

/**
 * Generated class for the AddArticlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-article',
  templateUrl: 'add-article.html',
  providers: [ ArticlesProvider ]
})
export class AddArticlePage {

  title: string;
  body: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public articleProvider: ArticlesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddArticlePage');
  }

  dissmiss() {
    this.viewCtrl.dismiss();
  }

  saveArticle() {
    this.articleProvider.addArticle(this.title, this.body);
    this.dissmiss();
  }

}
