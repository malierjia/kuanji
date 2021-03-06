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
sonidoClick: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public modalCtrl: ModalController,
    private _cas: CargaArchivosService, private tts:TextToSpeech) {
      // this._cas.cargar_imagenes();
  }

//
//   cargar_siguientes(){
//   console.log('sgtes');
//   var linksFromAPI = this._cas.cargar_imagenes();
// }


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

pasarcarta(imagen:string, tagUno:string, tagDos:string, tagTres: string){
  console.log('PASARCARTA OME OME');
  let modal = this.modalCtrl.create( CartatagsPage, {
    imagenLink: imagen,
    tagUnoLink: tagUno,
    tagDosLink: tagDos,
    tagTresLink: tagTres
  } );
  modal.present();
}

cargar_por_tag_Uno(){
  this._cas.cargar_por_tag_Uno();

}


cerrar_modal() {
  this.viewCtrl.dismiss();
}
}
