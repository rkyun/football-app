import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

/*
  Generated class for the MatchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MatchProvider {
matches: FirebaseListObservable<any>;
match={
    date: Date,
    location: String,
    weather: String,
    description: String,
    players: [],
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
  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello MatchService Provider');
    this.matches = db.list('/matches');
  }

  init(){
    this.matches.push({
      date: new Date().toISOString(),
      location: "WB",
      weather: "DOBRA",
      players: ['rykun','michu']
    });
  }

  get(){
    return this.matches;
  }

  set(match){
    this.matches.push(match);
  }

}
