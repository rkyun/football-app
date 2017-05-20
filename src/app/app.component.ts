import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html',
  providers: [AngularFireAuth]
  
})
export class MyApp {
  rootPage:any = TabsPage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth) {
 
      afAuth.auth.onAuthStateChanged((user) => {

          if (!user) {
              console.log("Not logged - going to LoginPage");
              this.rootPage = LoginPage;


          } else {
              console.log("Logged - going to HomePage");
              this.rootPage = TabsPage;

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
