import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MatchPage} from '../pages/match/match';
import { AddMatchPage } from '../pages/add-match/add-match';
import { RegistrationModalPage} from '../pages/registration-modal/registration-modal';
import { GuestModal} from '../pages/guest-modal/guest-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { MatchProvider } from '../providers/match/match';
import { AuthProvider } from '../providers/auth/auth';

 
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyB2JMeZEhGBBPn8nq49I2ib7gBEn50wNns",
    authDomain: "at-football.firebaseapp.com",
    databaseURL: "https://at-football.firebaseio.com",
    projectId: "at-football",
    storageBucket: "at-football.appspot.com",
    messagingSenderId: "419431587994"
};



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddMatchPage,
    MatchPage,
    RegistrationModalPage,
    GuestModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    LoginPage,
    AddMatchPage,
    MatchPage,
    RegistrationModalPage,
    GuestModal
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MatchProvider,
    AuthProvider,
  ]
})
export class AppModule {}
