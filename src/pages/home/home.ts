import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';
import { NavController, ModalController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import { IonicPage} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {TomarFotoPage} from '../tomar-foto/tomar-foto';
import { SubirPage } from '../subir/subir';
import { CatalogoPage } from '../catalogo/catalogo';
import { CartatagsPage } from '../cartatags/cartatags';
import { FelicidadesPage } from '../felicidades/felicidades';

import {CargaArchivosService} from '../../providers/carga-archivos/carga-archivos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  imgPreview: string =undefined;
  img: string ="";
  imageData: string;

  constructor(public navCtrl: NavController,private platform: Platform, private navParams: NavParams, private loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private camera: Camera, private ToastCtlr: ToastController, private _cas: CargaArchivosService) {}

  // Cameta modal method, used to be mostrar_modal
  show_camera(){

if(!this.platform.is("cordova")){
  this.mostrar_toast("Error, no estas desde un dispositivo movil")
  return;
}

let options: CameraOptions =
{
quality :80,
destinationType: this.camera.DestinationType.DATA_URL,
encodingType: this.camera.EncodingType.JPEG,
mediaType: this.camera.MediaType.PICTURE,
correctOrientation: true,
}

this.camera.getPicture( options )

.then(imageData => {
  this.imgPreview = `data:image/jpeg;base64,${imageData}`;
  this.img= imageData;

  console.log("Subiendo");
  let archivo = {
  'link':this.img,
    tag1:'lala',
    tag2: 'lala',
    tag3: 'lala'
  };

  let loader =this.loadingCtrl.create({
    content: "Subiendo"
  });
  loader.present();

  this._cas.cargar_imagenes_firebase( archivo).then (
  () =>{
    loader.dismiss();

      let modal =this.modalCtrl.create (FelicidadesPage);
      modal.present();

    },
    (error) => {
      loader.dismiss();
      this.mostrar_toast( "Error al cargar:"+error);
    });

  }, (err) => {
    this.mostrar_toast(err);
    console.log(err);
  });
  }

  // Gallery method, used to be onButtonClicked
  galley(){
    let modal = this.modalCtrl.create( CatalogoPage );
    modal.present();
  }



mostar_Congratz(){

    let modal =this.modalCtrl.create (FelicidadesPage);
    modal.present();
}

private mostrar_toast(texto:string){
  this.ToastCtlr.create({
    message:texto,
    duration:2500
  }).present();
}





}
