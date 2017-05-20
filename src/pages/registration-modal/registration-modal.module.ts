import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationModalPage } from './registration-modal';

@NgModule({
  declarations: [
    RegistrationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationModalPage),
  ],
  exports: [
    RegistrationModalPage
  ]
})
export class RegistrationModalPageModule {}
