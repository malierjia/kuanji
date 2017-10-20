import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import  { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class CargaArchivosService {

  private CARPETA_IMAGENES: string = '';
  private LINKS: string = 'links';
  private linkAPI: string = 'https://kuanji.herokuapp.com/predict?link=';

  imagenes:any [] = [];
  // imagenes: Observable<any[]>;
  lastKey:string = undefined;


  constructor( public af:AngularFireDatabase, public  toastCtrl:ToastController, public http: Http ) {

      }

  cargar_imagenes(){
      console.log('holi desde get all images');
      this.http.get('https://kuanji.herokuapp.com/getAllLinks').subscribe(res => {
          console.log(res);
          this.mostrar_toast("Eeeeeexito");
          this.mostrar_toast(res.toString());

          this.imagenes = res.json();
        }, (err) => {
          console.log(err);
        });
}

  cargar_imagenes_firebase( archivo:archivoSubir ){

    let promesa = new Promise( (resolve, reject)=>{
      this.mostrar_toast('Iniciando la carga');
      //ref storage
      let storageRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();  //el nombre es la fecha

      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.CARPETA_IMAGENES  }/${ nombreArchivo }`)
      .putString( archivo.link, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ( )=> {   }, //saber el avance del archivo

          ( error )=> {
                  console.log("Error al subir ", JSON.stringify( error ));
                  this.mostrar_toast( 'error al cargar: ' + JSON.stringify(error));
                  reject(error);
          }, //manejo de errores
          ( )=>{
              let url = uploadTask.snapshot.downloadURL;
            //  this.mostrar_toast('Imagen cargada con exito');
              this.crear_link_enBd(url);
              resolve();
          } //termino proceso
      )
    });
    return promesa;
  }


  private crear_link_enBd( url:string ) {
    //this.mostrar_toast(url)
    // TODO: For some reason it isnt working with the firebase images but it does with other ones from the internet
    // this.http.get('https://kuanji.herokuapp.com/predict?link='+url).do( res => this.mostrar_toast("Se subio la imagen"))
    this.http.get('https://kuanji.herokuapp.com/predict?link='+url)
	      .subscribe(res => {
          this.mostrar_toast("Eeeeeexito");
	      	console.log(res.json());
	      }, (err) => {
	      	console.log(err);
	      });
}

  private mostrar_toast( texto:string ){
    this.toastCtrl.create({
      message:texto,
      duration:2500
    }).present();
  }

}

interface archivoSubir{
  $key?:string, //el ? es porque es opcional
  link:string,
  tag1:string,
  tag3:string,
  tag2:string
}
