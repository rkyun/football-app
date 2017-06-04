import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AddStadiumPage} from '../add-stadium/add-stadium';

import { AuthProvider} from '../../providers/auth/auth';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [AuthProvider]
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  goToSettings(){
    this.navCtrl.push(SettingsPage);
  }
  goToHome(){
    this.navCtrl.push(HomePage);
  }

  signOut(){
    this.auth.signOut();
  }
  goToAddStadiumPage(){
    this.navCtrl.push(AddStadiumPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
