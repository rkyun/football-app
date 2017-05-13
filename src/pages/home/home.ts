import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { AddMatchPage } from '../add-match/add-match';
import { MatchProvider} from '../../providers/match/match';
import { MatchPage } from '../match/match';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireDatabase, MatchProvider]
})
export class HomePage {
  matches: any;
  match:{};
 

  

  constructor(public navCtrl: NavController, public data: MatchProvider) {
   this.matches = data.get();
  }

  goToAddMatchPage(){
    this.navCtrl.push(AddMatchPage);
  }

  goToMatchPage(pickedMatch){
    this.navCtrl.push(MatchPage,{'pickedMatch':pickedMatch});
  }

  

}
