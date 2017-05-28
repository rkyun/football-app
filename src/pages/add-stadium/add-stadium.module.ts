import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddStadiumPage } from './add-stadium';


@NgModule({
  declarations: [
    AddStadiumPage,
  ],
  imports: [
    IonicPageModule.forChild(AddStadiumPage),
  ],
  exports: [
    AddStadiumPage
  ]
})
export class AddStadiumPageModule {}
