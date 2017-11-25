import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class CargaArchivosService {

  private CARPETA_IMAGENES: string = '';
  private LINKS: string = 'links';
  private linkAPI: string = 'https://kuanji.herokuapp.com/predict?link=';

  imagenes: any[] = [];
  imagenesBackwards: any[] = [];
  imagesArray: any[] = [];


  // imagenes: Observable<any[]>;
  lastKey: string = undefined;


  // TODO: Necesito hacer que funcione en el portatil como local todo, debo preguntarle a manzano, ademas de eso aveiguar como vamos a decorar el salon

  constructor(public af: AngularFireDatabase, public toastCtrl: ToastController, public http: Http) {
    //this.cargar_imagenes()
  }

  cargar_imagenes() {
    console.log('holi desde get all images');
    // this.http.get('https://kuanji.herokuapp.com/getAllLinks').subscribe(res => {
    this.http.get('http://192.168.0.32:5000/getAllLinks').subscribe(res => {
      console.log(res);
      this.mostrar_toast("Eeeeeexito");
      //  this.mostrar_toast(res.toString());

      this.imagenes = res.json();
      this.imagenes = this.imagenes.reverse();

    }, (err) => {
      console.log(err);
    });
  }

  cargar_por_tag_Uno() {
    // starting with an empty array
    // this.imagenesBackwards = this.emptyArray;

    // this.http.get('https://kuanji.herokuapp.com/getSpecificTag?tagSearch=mujer').subscribe(res => {
    this.http.get('http://192.168.0.32:5000/getPersonas').subscribe(res => {
      console.log("holita desde encontrar beber");
      console.log(res.json());

      this.imagenes = res.json();
      this.imagenes = this.imagenes.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  cargar_por_tag_Dos() {

    // this.http.get('https://kuanji.herokuapp.com/getSpecificTag?tagSearch=perro').subscribe(res => {
    this.http.get('http://192.168.0.32:5000/getComidas').subscribe(res => {
      console.log("holita desde encontrar gato");
      console.log(res.json());

      this.imagenes = res.json();
      this.imagenes = this.imagenes.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  cargar_por_tag_Tres() {

    // this.http.get('https://kuanji.herokuapp.com/getSpecificTag?tagSearch=mujer').subscribe(res => {
    this.http.get('http://192.168.0.32:5000/getAnimals').subscribe(res => {
      console.log("holita desde encontrar perro");
      console.log(res.json());

      this.imagenes = res.json();
      this.imagenes = this.imagenes.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  cargar_imagenes_firebase(archivo: archivoSubir) {

    let promesa = new Promise((resolve, reject) => {
      this.mostrar_toast('Iniciando la carga');
      //ref storage
      let storageRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();  //el nombre es la fecha

      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${nombreArchivo}`)
        .putString(archivo.link, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => { }, //saber el avance del archivo

        (error) => {
          console.log("Error al subir ", JSON.stringify(error));
          this.mostrar_toast('error al cargar: ' + JSON.stringify(error));
          reject(error);
        }, //manejo de errores
        () => {
          let url = uploadTask.snapshot.downloadURL;
          //  this.mostrar_toast('Imagen cargada con exito');
          this.crear_link_enBd(url);
          resolve();
        } //termino proceso
      )
    });
    return promesa;
  }


  private crear_link_enBd(url: string) {
    // this.http.get('https://kuanji.herokuapp.com/predict?link='+url).do( res => this.mostrar_toast("Se subio la imagen"))
    this.http.get('https://kuanji.herokuapp.com/predict?link=' + url)
      .subscribe(res => {
        this.mostrar_toast("Eeeeeexito");
        console.log(res.json());
      }, (err) => {
        console.log(err);
      });
  }

  private mostrar_toast(texto: string) {
    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();
  }

}

interface archivoSubir {
  $key?: string, //el ? es porque es opcional
  link: string,
  tag1: string,
  tag3: string,
  tag2: string
}
