import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { AddMatchPage } from '../add-match/add-match';
import { MatchProvider} from '../../providers/match/match';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [AngularFireDatabase, MatchProvider]
})
export class AboutPage {
  matches: any;
  match:{};
 

  

  constructor(public navCtrl: NavController, public data: MatchProvider) {
   this.matches = data.get();
  }

  goToAddMatchPage(){
    this.navCtrl.push(AddMatchPage);
  }
  submit(match){
    this.data.set(match);

  }

  

}
