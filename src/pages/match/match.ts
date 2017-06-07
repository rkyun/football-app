import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import { GuestModal } from '../guest-modal/guest-modal';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

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
  
  @ViewChild(Content) content: Content;
  matchId: String;
  stadiumId: String;
  currentUser: any;
  match: any;
  currentMatch: any;
  pickedPlayer: any;
  stadium: any;
  currentStadium: any;
  matchInfo: any;
  user: any;
  currentUserInfo: any;
  messageText: any;
  listener: any;
  ref: any
  today: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public data: MatchProvider, public stadiumProvider: StadiumProvider, public modalCtrl: ModalController, ) {
        
      
      
        this.today=new Date().getDate();
        
        this.matchInfo='players';
        this.matchId=navParams.get('key');
        this.stadiumId=navParams.get('stadiumId');
        this.match=this.data.getMatchByKey(this.matchId);
        this.ref=this.data.listen(this.matchId);
        this.match.forEach(element => {
            this.currentMatch= element;
          });

        this.stadiumProvider.getStadiumByKey(this.stadiumId).forEach(element=>{
            this.stadium= element;
          });
    
        this.currentUser = auth.getCurrentUser();
        console.log(this.currentUser.uid, 'userid');

        this.auth.getUserByKey(this.currentUser.uid).then(res=>{
            this.currentUserInfo=res;
            
        }).catch(err=>{
          
        });


        

        
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Match');

    
   
      setTimeout(()=>{
        console.log(this.stadium, "Wybrany stadion");
         this.getWeather();

          
          
    }, 250);

     
    
  }

  ionViewDidEnter(){
     let ref=
     this.listener = this.ref.on('value', snapshot =>{
        if(this.matchInfo=='chat'){
              setTimeout(()=>{
          this.content.scrollToBottom(0);
        }, 150)
        }
      });
    console.log(this.listener, "siema");
     
  }
  ionViewDidLeave(){
    this.ref.off('value', this.listener)
    console.log(this.listener, "leave");
  }

  goToSettings(){
    this.navCtrl.push(SettingsPage);
  }
  goToHome(){
    this.navCtrl.push(HomePage);
  }

  getMatch(){
    
  }

  join(){
    let player = {uid:this.currentUser.uid,name:this.currentUserInfo.name,number:this.currentUserInfo.number,status:"user"};
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
        if(player.uid==this.currentUser.uid && player.status=="user"){
            this.currentMatch.players.splice(index, 1);
        }
    });
    this.data.update(this.matchId,{players:this.currentMatch.players});
  }

  isPlayerJoined(){
      let isPlayerJoined=false;
      if(this.currentMatch.players){ 
        this.currentMatch.players.forEach(player=>{
          if(player.uid==this.currentUser.uid){
            isPlayerJoined = true;
          }
        });
      } 
      return isPlayerJoined;   
  }

  random(){
    let teams = this.data.randomizeTeam(this.currentMatch.players.slice());
    this.currentMatch.teams={};
    this.currentMatch.teams.red={};
    this.currentMatch.teams.white={};
    this.currentMatch.teams.red["players"]=teams[0];
    this.currentMatch.teams.red["captain"]=teams[0][0]
    this.currentMatch.teams.white["players"]=teams[1];
    this.currentMatch.teams.white["captain"]=teams[1][0];

   
    console.log(this.currentMatch);
    this.data.update(this.matchId,{status:"Wylosowane",teams:this.currentMatch.teams});
  }

  removePlayer(pickedPlayer){
    this.currentMatch.players.forEach((player, index)=>{
        if(pickedPlayer==player.uid){
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
    let currentDate=new Date();
    let matchDate=new Date(this.currentMatch.date + " " + this.currentMatch.time);
    var timeDiff = Math.abs(currentDate.getTime() - matchDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    console.log(diffDays);

    console.log(currentDate, matchDate);
    if( diffDays < 6){
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
        this.currentMatch.weather=Math.round(weather.list[closestIndex].main.temp);
      }
    );
  } else{
    this.currentMatch.weather="-"
    
  }
}

    sendMessage(){
      
      let message = {uid:this.currentUser.uid,time:new Date().toISOString(),text:this.messageText,number:this.currentUserInfo.number, name: this.currentUserInfo.name};
    if (this.currentMatch.chat){
      this.currentMatch.chat.push(message);
      this.data.update(this.matchId,{chat:this.currentMatch.chat});
    } else{
      this.currentMatch.chat=[message];
      this.data.update(this.matchId,{chat: this.currentMatch.chat});
    }

    this.messageText="";
    
    
  }


  isSameDate(date){
   
    let _date=new Date(date).getDate();

    if(this.today==_date){
      return true;
    } else{
      return false;
    }
  
  
  }

  cancelTeams(){
    this.data.update(this.matchId, {status: "Planowany", teams: {}});
  }
  
 

}
