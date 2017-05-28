import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import { StadiumProvider } from "../../providers/stadium/stadium";
import { HomePage } from '../home/home';

/**
 * Generated class for the AddStadionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-stadium',
  templateUrl: 'add-stadium.html',
  providers: [AngularFireDatabase, StadiumProvider]
})
export class AddStadiumPage {

  stadium= {
    name: null,
    address: null,
    city: null,
    lat: null,
    long: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public data: StadiumProvider) {
    this.stadium.name=null;
    this.stadium.address=null;
    this.stadium.city=null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStadiumPage');
  }

  submit(){
    this.getCoordsAndSave()
    this.navCtrl.pop();
    
  }



  getCoordsAndSave(){
    this.data.getCoords(this.stadium.address, this.stadium.city).subscribe(resp=>{
      
        this.stadium.lat=resp.results[0].geometry.location.lat;
        this.stadium.long=resp.results[0].geometry.location.lng;
        this.data.set(this.stadium);
        
    });
    
  }
}
