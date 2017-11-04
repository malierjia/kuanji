import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController,ModalController } from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

//servicios o providers
import { CargaArchivosService } from '../../providers/carga-archivos/carga-archivos';


@IonicPage()
@Component({
  selector: 'page-cartatags',
  templateUrl: 'cartatags.html',
})

export class CartatagsPage {
@ViewChild(Slides) slides: Slides;

text:string;
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
    this.sonidoInicial();
    }

async sonido(): Promise<any>{
  let currentIndex = this.slides.getActiveIndex();
   if(currentIndex==0){
     this.sonidoClick = this.tagUnoLink;
 }
 if (currentIndex==1){
   this.sonidoClick = this.tagDosLink;

} if (currentIndex==2){
  this.sonidoClick = this.tagTresLink;
}

  try{
    await this.tts.speak ({
    text: this.sonidoClick,
    locale: 'es-ES' });
    console.log("Success"+ this.text);
  }catch(e){
console.log(e);
  }
}


async sonidoInicial(): Promise<any>{
  let currentIndex = this.slides.getActiveIndex();
   if(currentIndex==0){
     this.sonidoClick = this.tagUnoLink;
 }
 if (currentIndex==1){
   this.sonidoClick = this.tagDosLink;

} if (currentIndex==2){
  this.sonidoClick = this.tagTresLink;
}

  try{
    await this.tts.speak ({
    text: this.sonidoClick,
    locale: 'es-ES' });
    console.log("Success"+ this.text);
  }catch(e){
console.log(e);
  }
}







//slidem =[
//  {
//  image: imagenLink,
//  title: tagUnoLink,
//  },
//  {
//  image: imagenLink,
//  title: tagDosLink,
//  },
//  {
//  image: imagenLink,
//  title: tagTresLink,}];


slideChanged() {
   let currentIndex = this.slides.getActiveIndex();
    if(currentIndex==3){
      this.slides.stopAutoplay();
  }
}

cerrar_modal() {
  this.viewCtrl.dismiss();
}

}
