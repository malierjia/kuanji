import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { IonicPage} from 'ionic-angular';
import {TomarFotoPage} from '../tomar-foto/tomar-foto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

constructor(public navCtrl: NavController,
  public modalCtrl: ModalController) {}

public onButtonClicked():  void{
    let modal= this.modalCtrl.create(TomarFotoPage);
    modal.present();
  }
}
