import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { MatchPage } from '../match/match';
import { AddMatchPage } from '../add-match/add-match';
import { MatchProvider} from '../../providers/match/match';
import { AuthProvider} from '../../providers/auth/auth';
import { AddStadiumPage} from '../add-stadium/add-stadium';
import { StadiumProvider } from '../../providers/stadium/stadium';
import { SettingsPage } from '../settings/settings';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireDatabase, MatchProvider, AuthProvider, StadiumProvider ]
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
  stadions=[];
 

  

  constructor(public navCtrl: NavController, public data: MatchProvider, public stad: StadiumProvider, public auth: AuthProvider) {
   this.matches = data.get()
   this.matches.location={};
   this.matches.forEach((element,i) => {   
     element.forEach((el,index)=>{
       this.getStadium(el.stadiumId).forEach(e=>
       {
            this.stadions.push(e);
            console.log(e);
   
       });
       
     })
    
   });


   console.log(this.stadions);
   
   
   

 
    
   
   
  }

  goToAddMatchPage(){
    this.navCtrl.push(AddMatchPage);
  }

  goToMatchPage(match, key, stadiumId){
    this.navCtrl.push(MatchPage,{'match':match, 'key': key, 'stadiumId': stadiumId});
    
  }

  goToSettings(){
    this.navCtrl.push(SettingsPage);
  }
  goToHome(){
    this.navCtrl.push(HomePage);
  }


  getStadium(stadiumId){
      return this.stad.getStadiumByKey(stadiumId);
  }

  

  

  

}
