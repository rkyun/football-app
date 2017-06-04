import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MatchProvider} from '../../providers/match/match';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

/**
 * Generated class for the GuestModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-guest-modal',
  templateUrl: 'guest-modal.html',
  providers: [AngularFireDatabase, MatchProvider]
})
export class GuestModal {
  name: String;
  matchId: any;
  match: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public data: MatchProvider) {
    this.matchId=this.navParams.get("matchId");
    this.match=this.navParams.get("match");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestModal');
  }

  submit(){
    let player = {uid:new Date().getUTCMilliseconds(),name:this.name,status:"guest", number:"#"};
    if (this.match.players){
      this.match.players.push(player);
      this.data.update(this.matchId,{players:this.match.players});
    } else{
      this.match.players=[player];
      this.data.update(this.matchId,{players: this.match.players});
    }
    this.name="";
    this.navCtrl.pop();
  }

  

}
