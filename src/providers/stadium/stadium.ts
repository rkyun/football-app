import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the StadiumProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StadiumProvider {
  stadiums: FirebaseListObservable<any>;
  stadium= {
    name: null,
    address: null,
    city: null,
    lat: null,
    long: null
  };

  constructor(public http: Http, public db: AngularFireDatabase) {
    this.stadiums = db.list('/stadions');
    console.log('Hello StadiumProvider Provider');
  }


  get(){
    return this.stadiums;
  }

  set(stadium){
    this.stadiums.push(stadium);
  }

  getCoords(address, city): Observable<any>{
  return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city}&key=AIzaSyBXNvC7eoi5gJEJDCkmwFoxoIZVEtmX9Eg`)
  .map(response => response.json());
} 

  getStadiumByKey(key){
    return this.db.object('/stadions/'+key);
  }


}
