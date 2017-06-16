import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the RegistrationModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registration-modal',
  templateUrl: 'registration-modal.html',
  providers: [AuthProvider, AngularFireAuth]
})
export class RegistrationModalPage {
  name: String;
  email: String;
  password: String;
  number: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationModalPage');
  }

  submit() {
    this.auth.signUp(this.email, this.password, this.name, this.number);
    this.viewCtrl.dismiss();

  }

}
