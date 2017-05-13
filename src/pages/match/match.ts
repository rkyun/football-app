import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
})
export class MatchPage {
  matches: Object;
  match={
    date: Date,
    location: String,
    weather: String,
    description: String,
    players: {},
    teams: {
      red:{},
      white:{}
    },
    status: String,
    result:{
      red: Number,
      white: Number,
      winner: String
    }
  };
  pickedMatch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pickedMatch=navParams.get('pickedMatch');
    console.log(this.pickedMatch);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Match');
  }

}
