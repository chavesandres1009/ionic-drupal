import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { ArticlesProvider } from '../../providers/articles/articles';
import { AddArticlePage } from '../add-article/add-article';
/**
 * Generated class for the ArticlesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
  providers: [ArticlesProvider]
})
export class ArticlesPage {

  public articles : any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public articlesProvider: ArticlesProvider, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
    this.articles = this.articlesProvider.articles;
  }

  popUpModal() {
    let modal = this.modalCtrl.create(AddArticlePage);
    modal.present();
  }

  refresh(refresher : any) {
    this.articlesProvider.loadArticles();
    this.articles = this.articlesProvider.articles;
    refresher.complete();
  }
  
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Article',
      buttons: [
        {
          text: 'Edit',
          role: 'edition',
          handler: () => {
            console.log('Edit clicked');
          }
        },{
          text: 'Remove',
          handler: () => {
            console.log('Remove clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
