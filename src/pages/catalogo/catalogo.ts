import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController,ModalController } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';

//servicios o providers
import { CargaArchivosService } from '../../providers/carga-archivos/carga-archivos';
import { CartatagsPage } from '../cartatags/cartatags';

@IonicPage()
@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {

text:string;
categorias: string = "cat1";
sonidoClick: string;

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

async sonido( sonidoClick: string ): Promise<any>{
  try{
    await this.tts.speak ({
      text: sonidoClick,
    locale: 'es-ES'});
    console.log("Success"+ this.text);
  }catch(e){
console.log(e);
  }
}

pasarcarta(imagen:string, tagUno:string, tagDos:string, tagTres: string)
{
  let modal = this.modalCtrl.create( CartatagsPage, {
    imagenLink: imagen,
    tagUnoLink: tagUno,
    tagDosLink: tagDos,
    tagTresLink: tagTres
  } );
  modal.present();
}


cerrar_modal() {
  this.viewCtrl.dismiss();
}

}
