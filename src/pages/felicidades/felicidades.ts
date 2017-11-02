import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { CatalogoPage } from '../catalogo/catalogo';

/**
 * Generated class for the FelicidadesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-felicidades',
  templateUrl: 'felicidades.html',
})
export class FelicidadesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,   public modalCtrl: ModalController, ) {
    // setTimeout(function () {
    //   console.log('AutoCerrado');
    //   this.cerrar_modal();
    // }, 5000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FelicidadesPage');
  }

  cerrar_modal() {
    console.log('AutoCerrado');
    this.viewCtrl.dismiss();
    // Method for congratulations
      let modal = this.modalCtrl.create( CatalogoPage );
      modal.present();
  }

}
