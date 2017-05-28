import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { MatchProvider} from '../../providers/match/match';
import {StadiumProvider} from '../../providers/stadium/stadium';
import { HomePage } from '../home/home';
/**
 * Generated class for the AddMatchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-match',
  templateUrl: 'add-match.html',
  providers: [AngularFireDatabase, MatchProvider, StadiumProvider]
})
export class AddMatchPage {
   match ={
    type: null,
    date: null,
    time: null,
    timestamp: null,
    location: null,
    weather: null,
    description: null,
    players: [],
    teams: {
      red:[],
      white:[]
    },
    status: null,
    result:{
      red: null,
      white: null,
      winner: null
    }
  };
  data: any;
  stadiums: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public _data: MatchProvider, public stadium: StadiumProvider) {
   this.data=_data;
   this.stadiums=stadium.get();
   console.log('siema z konstruktora');
  }


  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMatchPage');
    console.log('SIEMA');
  }
 
  submit(){
    this.match.timestamp=Math.floor(Date.parse(new Date(this.match.date + ' ' + this.match.time).toUTCString())/ 1000);
    
    this.match.status="Planowany";
    this.data.set(this.match);
    this.navCtrl.push(HomePage);
  }
  
  getStadiums(){

  }
  

}
