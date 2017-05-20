import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { MatchPage } from '../match/match';
import { AddMatchPage } from '../add-match/add-match';
import { MatchProvider} from '../../providers/match/match';
import { AuthProvider} from '../../providers/auth/auth';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireDatabase, MatchProvider, AuthProvider ]
})
export class HomePage {
  matches: any;
  match={
    date: Date,
    location: String,
    weather: String,
    description: String,
    players: [],
    teams: {
      red: {},
      white:{}
    },
    status: String,
    result:{
      red: Number,
      white: Number,
      winner: String
    }
  };
 

  

  constructor(public navCtrl: NavController, public data: MatchProvider, public auth: AuthProvider) {
   this.matches = data.get();
   console.log("siema");
   console.log(this.matches);
   
    console.log("siema");
  }

  goToAddMatchPage(){
    this.navCtrl.push(AddMatchPage);
  }

  goToMatchPage(match, key){
    this.navCtrl.push(MatchPage,{'match':match, 'key': key});
    
  }

  signOut(){
    this.auth.signOut();
  }

  

  

  

}
