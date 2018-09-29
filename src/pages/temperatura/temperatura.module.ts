import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemperaturaPage } from './luminosidade';

@NgModule({
  declarations: [
    TemperaturaPage,
  ],
  imports: [
    IonicPageModule.forChild(TemperaturaPage),
  ],
})
export class TemperaturaPageModule {}
