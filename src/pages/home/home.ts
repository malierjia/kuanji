import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { IonicPage} from 'ionic-angular';
import {TomarFotoPage} from '../tomar-foto/tomar-foto';
import { SubirPage } from '../subir/subir';
import { CatalogoPage } from '../catalogo/catalogo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController) {}

  // Cameta modal method, used to be mostrar_modal
  camera(){
    let modal = this.modalCtrl.create( SubirPage );
    modal.present();
  }

  // Gallery method, used to be onButtonClicked
  galley(){
    let modal = this.modalCtrl.create( CatalogoPage );
    modal.present();
  }

}
