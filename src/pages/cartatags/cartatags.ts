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
categorias: string = "cat1";
sonidoClick: string;

public imagenLink;
public tagUnoLink;
public tagDosLink;
public tagTresLink;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public modalCtrl: ModalController,
    private _cas: CargaArchivosService, private tts:TextToSpeech) {
      this._cas.cargar_imagenes();
      this.imagenLink = navParams.get("imagenLink");
      this.tagUnoLink = navParams.get("tagUnoLink");
      this.tagDosLink = navParams.get("tagDosLink");
      this.tagTresLink = navParams.get("tagTresLink");

  }

async sonido( sonidoClick: string ): Promise<any>{
  try{

    await this.tts.speak ({
      text: sonidoClick,
    locale: 'es-ES' });
    console.log("Success"+ this.text);
  }catch(e){
console.log(e);
  }
}


cerrar_modal() {
  this.viewCtrl.dismiss();
}

}
