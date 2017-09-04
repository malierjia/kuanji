import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController,ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cartatags',
  templateUrl: 'cartatags.html',
})
export class CartatagsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartatagsPage');
  }

  public onButtonClicked():void{
  this.viewCtrl.dismiss();
  }


}
