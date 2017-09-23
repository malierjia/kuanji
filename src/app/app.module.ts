import { NgModule, ErrorHandler } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {TextToSpeech} from '@ionic-native/text-to-speech';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {CartatagsPage} from '../pages/cartatags/cartatags';
import {CatalogoPage} from '../pages/catalogo/catalogo';
import {FelicidadesPage} from '../pages/felicidades/felicidades';
import {TomarFotoPage} from '../pages/tomar-foto/tomar-foto';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SubirPage } from '../pages/subir/subir';

//Angular and firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//import the database and stuff config
import { firebaseConfig } from '../config/firebase.config';
import { ImagePicker } from '@ionic-native/image-picker';

//Servicios / providers
import { CargaArchivosService  } from '../providers/carga-archivos/carga-archivos';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CartatagsPage,
    CatalogoPage,
    FelicidadesPage,
    TomarFotoPage,
    SubirPage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom'}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CartatagsPage,
    CatalogoPage,
    FelicidadesPage,
    TomarFotoPage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    CargaArchivosService,
    TextToSpeech,

    {
      provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
