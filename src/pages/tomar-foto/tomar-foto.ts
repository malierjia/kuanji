import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import {CameraOptions, Camera} from '@ionic-native/camera';
import {CartatagsPage} from '../cartatags/cartatags';


@IonicPage()
@Component({
  selector: 'page-tomar-foto',
  templateUrl: 'tomar-foto.html'
})


export class TomarFotoPage {

  image: string = null;


constructor(public navCtrl: NavController, public navParams: NavParams,
private camera: Camera, public viewCtrl: ViewController, public modalCtrl: ModalController
   ) {this.getPicture();}

//cargar pagina
   ionViewDidLoad() {
     console.log('ionViewDidLoad TomarFotoPage');
   }

    getPicture(){
        let options: CameraOptions = {
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 1000,
          targetHeight: 1000,
          quality: 100
        }
        this.camera.getPicture( options )
        .then(imageData => {
          this.image = `data:image/jpeg;base64,${imageData}`;

        })
        .catch(error =>{
          console.error( error );
        });
      }

public onButtonClicked():  void{
          let modal= this.modalCtrl.create(CartatagsPage);
          modal.present();
}

//public onButtonClicked():void{
//this.viewCtrl.dismiss();
//}

}
