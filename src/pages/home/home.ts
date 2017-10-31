import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, ModalController, NavParams} from 'ionic-angular';
import { IonicPage} from 'ionic-angular';
import { ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TomarFotoPage} from '../tomar-foto/tomar-foto';
import { SubirPage } from '../subir/subir';
import { CatalogoPage } from '../catalogo/catalogo';

//servicios / providers
import { CargaArchivosService } from '../../providers/carga-archivos/carga-archivos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  imgPreview: string = undefined;
  img: string = "";

  constructor(public navCtrl: NavController, private platform: Platform, private navParams: NavParams, private loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private camera: Camera, private ToastCtlr: ToastController,  private _cas: CargaArchivosService) {}

  // Cameta modal method, used to be mostrar_modal
  show_camera(){

    if (!this.platform.is("cordova")) {
      this.mostrar_toast("Error, no estas desde un dispositivo movil");
      return;
    }
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgPreview = `data:image/jpeg;base64,${imageData}`;
      this.img = imageData;

      // let modal = this.modalCtrl.create( SubirPage, {
      //     preview: this.imgPreview,
      //     imagen: this.img
      // });
      // modal.present();

        console.log("subiendo");
        let archivo = {
          'link':this.img,
          'tag1':'lala',
          'tag3':'lala',
          'tag2':'lala'
        };

        let loader = this.loadingCtrl.create({
          content: "Subiendo"
        });
        loader.present();

        this._cas.cargar_imagenes_firebase( archivo ).then(
          ( ) => {
              loader.dismiss();
          }, //cuando termine de subir
          ( error )=>{
            loader.dismiss();
            this.mostrar_toast("Error al cargar: " + error );
          });
    }, (err) => {
      // Handle error
      this.mostrar_toast(err);
      console.log(err);
    });
  }

  // Gallery method, used to be onButtonClicked
  galley(){
    let modal = this.modalCtrl.create( CatalogoPage );
    modal.present();
  }

  private mostrar_toast(texto: string) {
    this.ToastCtlr.create({
      message: texto,
      duration: 2500
    }).present();
  }
}
