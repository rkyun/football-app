import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestModal } from './guest-modal';

@NgModule({
  declarations: [
    GuestModal,
  ],
  imports: [
    IonicPageModule.forChild(GuestModal),
  ],
  exports: [
    GuestModal
  ]
})
export class GuestModalPageModule {}
