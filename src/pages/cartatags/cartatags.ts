import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController,ModalController } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';

//servicios o providers
import { CargaArchivosService } from '../../providers/carga-archivos/carga-archivos';

@IonicPage()
@Component({
  selector: 'page-cartatags',
  templateUrl: 'cartatags.html',
})
export class CartatagsPage {

text:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public modalCtrl: ModalController,
    private _cas: CargaArchivosService, private tts:TextToSpeech) {
      this._cas.cargar_imagenes();

  }

  cargar_siguientes(infiniteScroll: any){
  console.log('sgtes');
  this._cas.cargar_imagenes().then(
    () => {
      infiniteScroll.complete();

    }
  );
}

async sonido(): Promise<any>{
  try{
    await this.tts.speak ("HOLI");
    console.log("Success"+ this.text);
  }catch(e){
console.log(e);
  }
}

cerrar_modal() {
  this.viewCtrl.dismiss();
}

}
