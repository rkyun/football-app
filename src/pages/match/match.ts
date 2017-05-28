import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import { GuestModal } from '../guest-modal/guest-modal';

import { AuthProvider} from '../../providers/auth/auth';
import { MatchProvider} from '../../providers/match/match';
import {StadiumProvider} from '../../providers/stadium/stadium';

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
  providers: [AngularFireDatabase, AuthProvider, MatchProvider, StadiumProvider]
})
export class MatchPage {
  matchId: String;
  stadiumId: String;
  currentUser: any;
  match: any;
  currentMatch: any;
  pickedPlayer: any;
  stadium: any;
  currentStadium: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public data: MatchProvider, public stadiumProvider: StadiumProvider, public modalCtrl: ModalController, ) {
    
    this.matchId=navParams.get('key');
    this.stadiumId=navParams.get('stadiumId');
    this.match=this.data.getMatchByKey(this.matchId);
   
       this.match.forEach(element => {
           this.currentMatch= element;
        });

     this.stadiumProvider.getStadiumByKey(this.stadiumId).forEach(element=>{
        this.stadium= element;
      })

        
      
     
    

       


     
    
    this.currentUser = auth.getCurrentUser(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Match');
   
      setTimeout(()=>{
        console.log(this.stadium, "Wybrany stadion");
         this.getWeather();
    }, 250);
       
   
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

  getWeather(){
    let temp;
    let closestTimeStamp=null;
    let closestIndex=null;
    this.data.getWeather(this.stadium.lat,this.stadium.long).subscribe(
      weather => {
        weather.list.forEach((day, index)=>{
          if (index==0){
            closestIndex=0;
            closestTimeStamp=Math.abs(this.currentMatch.timestamp - day.dt);
          } else{
            
            temp=  Math.abs(this.currentMatch.timestamp - day.dt);
           
            
            if (temp<=closestTimeStamp){
              closestIndex=index;
              closestTimeStamp=temp;
            }
          }
        });
        console.log(weather.list[closestIndex].main.temp);
      }
    );
  }

}
