import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage} from '../pages/login/login';
import { HomePage } from '../pages/home/home'
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html',
  providers: [AngularFireAuth]
  
})
export class MyApp {
  rootPage:any = HomePage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth) {
 
      afAuth.auth.onAuthStateChanged((user) => {

          if (!user) {
              console.log("Not logged - going to LoginPage");
              this.rootPage = LoginPage;


          } else {
              console.log("Logged - going to HomePage");
              this.rootPage = HomePage;

          }

      });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
