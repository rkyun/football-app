import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import { GuestModal } from '../guest-modal/guest-modal';

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
  pickedPlayer: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public data: MatchProvider, public modalCtrl: ModalController) {
    
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
    let player = {name:this.currentUser.email,status:"user"};
    if (this.currentMatch.players){
      this.currentMatch.players.push(player);
      this.data.update(this.matchId,{players:this.currentMatch.players});
    } else{
      this.currentMatch.players=[player];
      this.data.update(this.matchId,{players: this.currentMatch.players});
    }
  }

  leave(){
    this.currentMatch.players.forEach((player, index)=>{
        if(player.name==this.currentUser.email && player.status=="user"){
            this.currentMatch.players.splice(index, 1);
        }
    });
    this.data.update(this.matchId,{players:this.currentMatch.players});
  }

  isPlayerJoined(){
      let isPlayerJoined=false;   
      if(this.currentMatch.players){ 
        this.currentMatch.players.forEach(player=>{
          if(player.name==this.currentUser.email){
            isPlayerJoined = true;
          }
        });
      } 
      return isPlayerJoined;   
  }

  random(){
    let teams = this.data.randomizeTeam(this.currentMatch.players.slice());
    this.currentMatch.teams={};
    this.currentMatch.teams["red"]=teams[0];
    this.currentMatch.teams["white"]=teams[1];
   
    console.log(this.currentMatch);
    this.data.update(this.matchId,{teams:this.currentMatch.teams});
  }

  addPlayer(){
    //todo
  }

  removePlayer(pickedPlayer){
    this.currentMatch.players.forEach((player, index)=>{
        if(pickedPlayer==player.name){
            this.currentMatch.players.splice(index, 1);
        }
    });
    this.data.update(this.matchId,{players:this.currentMatch.players});
    this.pickedPlayer=null;
  }

  pickPlayer(ziom){
   this.pickedPlayer=ziom;
  }

  showGuestModal() {
    let registrationModal = this.modalCtrl.create(GuestModal, {matchId: this.matchId, match: this.currentMatch})
    registrationModal.present();
  }

}
