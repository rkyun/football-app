import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { MatchProvider} from '../../providers/match/match';

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
  providers: [AngularFireDatabase, MatchProvider]
})
export class AddMatchPage {
  matches:{};
  
   match ={
    date: null,
    location: null,
    weather: null,
    description: null,
    players: {},
    teams: {
      red:{},
      white:{}
    },
    status: null,
    result:{
      red: null,
      white: null,
      winner: null
    }
  };
  data: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public _data: MatchProvider) {
   this.data=_data;
   console.log('siema z konstruktora');
  }


  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMatchPage');
    console.log('SIEMA');
  }
  
  submit(){
    this.data.set(this.match);
     this.navCtrl.pop();
  }

}
