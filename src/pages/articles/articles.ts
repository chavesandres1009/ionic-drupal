import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ArticlesProvider } from '../../providers/articles/articles';
import { AddEditArticlePage } from '../add-edit-article/add-edit-article';
/**
 * Generated class for the ArticlesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public articlesProvider: ArticlesProvider, 
    public modalCtrl: ModalController, 
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) 
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
  }

  popUpModal() {
    let modal = this.modalCtrl.create(AddEditArticlePage);
    modal.present();
  }

  refresh(refresher : any) {
    this.articlesProvider.load(true).subscribe(() => {
      refresher.complete();
    });
  }

  removeArticle(nid: string) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.articlesProvider.removeArticle(nid).subscribe(
      (res) => {
        this.articlesProvider.load(true).subscribe(
          () => {
            loading.dismiss();
          }
        );
      }
    );
  }

  editArticle(nid: string) {
    let modal = this.modalCtrl.create(AddEditArticlePage, {nid: nid});
    modal.present();
  }
  
  presentActionSheet(nid: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Article',
      buttons: [
        {
          text: 'Edit',
          role: 'edition',
          handler: () => {
            console.log('Edit clicked ' + nid);
            this.articlesProvider.getArticle(nid);
            this.editArticle(nid);

          }
        },{
          text: 'Remove',
          handler: () => {
            console.log('Remove clicked: Article: ' + nid);
            this.removeArticle(nid);
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
