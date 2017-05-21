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
      red:[],
      white:[]
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
  getPlayers(){
    return this.match.players;
  }

  

  update(id, match){
    this.matches.update(id, match);
  }

  getMatchByKey(key){
    return this.db.object('/matches/'+key);
  }

  randomizeTeam(players){
    let rand;
    let player;
    let _players=players.slice();
    let red=[];
    let white=[];
    

    for(let i=0; i<players.length; i++){
      rand=Math.floor(Math.random()*_players.length);
      player=_players[rand];
      console.log(player);
      if (i % 2 == 0){   
          red.push(player);
      } else{
          white.push(player);
      }
      _players.splice(rand, 1);
    }
    
  return [red, white];
    
  }

}
