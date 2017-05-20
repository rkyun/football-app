import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import { AuthProvider} from '../../providers/auth/auth';
import { MatchProvider} from '../../providers/match/match';

/**
 * Generated class for the Match page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
  providers: [AngularFireDatabase, AuthProvider, MatchProvider]
})
export class MatchPage {
  matchId: String;
  currentUser: any;
  match: any;
  currentMatch: any;
  
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public data: MatchProvider) {
    this.matchId=navParams.get('key');
    this.match=this.data.getMatchByKey(this.matchId);
    this.match.forEach(element => {
           this.currentMatch= element;
        });

    this.currentUser = auth.getCurrentUser();

   
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Match');
  }

  getMatch(){
    
  }

  join(){
    if (this.currentMatch.players){
      this.currentMatch.players.push(this.currentUser.email);
      this.data.update(this.matchId,{players:this.currentMatch.players});
    } else{
      this.currentMatch.players=[this.currentUser.email];
      this.data.update(this.matchId,{players: this.currentMatch.players});
    }
  }

  leave(){
    this.currentMatch.players.pop(this.currentUser.email);
    this.data.update(this.matchId,{players:this.currentMatch.players});
  }


  isPlayerJoined(){
      let isPlayerJoined=false;   
      if(this.currentMatch.players){ 
        this.currentMatch.players.forEach(player=>{
          if(player==this.currentUser.email){
            isPlayerJoined = true;
          }
        });
      } 
      return isPlayerJoined;   
  }

}
