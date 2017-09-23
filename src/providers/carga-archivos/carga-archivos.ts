import { Injectable } from '@angular/core';

import  { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class CargaArchivosService {

  private CARPETA_IMAGENES: string = 'img';
  private LINKS: string = 'links';

  imagenes:any [] = [];
  lastKey:string = undefined;


  constructor( public af:AngularFireDatabase, public  toastCtrl:ToastController ) {

  }

  cargar_imagenes(){

    //TODO: fix error on infiniteScroll, it only loading 7 images in total

    return new Promise( (resolve, reject) =>{
      this.af.list('/links', {
        query: {
          limitToLast: 4,
          orderByKey: true,
          endAt: this.lastKey
        }
      }).subscribe( links => {
        if(this.lastKey){
          links.pop();
        }

        if(links.length == 0){
          console.log("no hay mas");
          resolve(false);
          return;
        }

        this.lastKey = links[0].$key;
        for(let i = links.length-1; i>=0; i--){
          let link = links[i];
          this.imagenes.push( link );
        }
      })
    })

  }

  cargar_imagenes_firebase( archivo:archivoSubir ){

    let promesa = new Promise( (resolve, reject)=>{
      this.mostrar_toast('Iniciando la carga');

      //ref storage
      let storageRef = firebase.storage().ref();
      let nombreArchivo = new Date().valueOf(); //el nombre es la fecha

      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.CARPETA_IMAGENES  }/${ nombreArchivo }`)
      .putString( archivo.link, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ( snapshot )=> {   }, //saber el avance del archivo

          ( error )=> {
                  console.log("Error al subir ", JSON.stringify( error ));
                  this.mostrar_toast( 'error al cargar: ' + JSON.stringify(error));
                  reject(error);
          }, //manejo de errores

          ( )=>{

              let url = uploadTask.snapshot.downloadURL;
              this.mostrar_toast('Imagen cargada con exito');
              this.crear_link_enBd(url);
              resolve();
          } //termino proceso

      )

    });
    return promesa;

  }

  private crear_link_enBd( url:string ) {
    let link:archivoSubir = {
      link: url,
      tag1: 'tag',
      tag2: 'tag',
      tag3: 'tag'
    };

    let $key = this.af.list(`/${ this.LINKS }`).push( link ).key;
    link.$key = $key;

    this.imagenes.push( link );
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
