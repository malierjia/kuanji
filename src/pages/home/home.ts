import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { IonicPage} from 'ionic-angular';
import {TomarFotoPage} from '../tomar-foto/tomar-foto';
import { SubirPage } from '../subir/subir';
import { CartatagsPage } from '../cartatags/cartatags';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

constructor(public navCtrl: NavController,
  public modalCtrl: ModalController) {}

//cambio de pagina a camara
mostrar_modal(){
    let modal = this.modalCtrl.create( SubirPage );
    modal.present();
  }

onButtonClicked(){
  let modal = this.modalCtrl.create( CartatagsPage );
  modal.present();
}

}
