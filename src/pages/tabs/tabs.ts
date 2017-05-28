import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AddStadiumPage } from '../add-stadium/add-stadium';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddStadiumPage;
  

  constructor() {

  }
}
