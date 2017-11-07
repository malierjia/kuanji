import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {

        var audio = new Audio('audio/Bomba_Pa_Siempre_Sting.mp3');
          audio.play();

          setTimeout(() => {
            let modal = this.modalCtrl.create( CatalogoPage );
            modal.present();

          },6000);
//this.streamingMedia.playAudio ('file://audio/Bomba_Pa_Siempre_Sting.mp3', options);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad FelicidadesPage');

    }
}
