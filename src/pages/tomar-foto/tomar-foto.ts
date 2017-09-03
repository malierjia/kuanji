import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController  } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions,
CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import {CameraOptions, Camera} from '@ionic-native/camera'
import { Diagnostic } from '@ionic-native/diagnostic';

@IonicPage()
@Component({
  selector: 'page-tomar-foto',
  templateUrl: 'tomar-foto.html',
  providers: [CameraPreview, Diagnostic]
})


export class TomarFotoPage {

  image: string = null;


constructor(public navCtrl: NavController,
public navParams: NavParams,
private toastCtrl: ToastController,
private camera: Camera,
private diagnostic: Diagnostic,
public viewCtrl: ViewController,
private cameraPreview: CameraPreview
   ) {
   }

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

public onButtonClicked():void{
this.viewCtrl.dismiss();
}

}
