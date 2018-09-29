import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {TemperaturaPage} from './../temperatura/temperatura'
import { LuminosidadePage } from '../luminosidade/luminosidade';
import { DweetServiceProvider } from '../../providers/dweet-service';
import { Dweet } from '../../models/dweet';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';
import { With } from '../../models/with';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  private thingName: any;
  private dweet: Dweet;
  private isLoading:boolean=true;
  private time:any;
  private msgTocado:string="";
  private msgBotao:string="";
  private msgStatus:string="";

  constructor(public navCtrl: NavController, private dweetService:DweetServiceProvider) {
    this.thingName=DweetSettingsEnum.DWEET_NAME;
    this.time = setInterval(()=>{this.getLastDweets()},3000)
  }
  ngOnInit(){
    
  }

  goToTempPage(){
    this.navCtrl.push(TemperaturaPage);
  }
  goToLuxPage(){
    this.navCtrl.push(LuminosidadePage);

  }

  private alarme( i: number){
    this.dweetService.sendAlarm(i);
  }

  private getLastDweets(){
    this.dweetService.loadLastDweets(this.thingName)
    
    .subscribe(data => 
      this.preencherDweet(data),

    err=>console.log(),
    ()=>
      this.isLoading=false
    );
}
private preencherDweet(data:any){
  console.log(data);
  this.dweet=this.dweetService.preencherDweet(data);
  this.dweet.with[0].content.getSendoTocado() ? this.msgTocado = "Touch is touched." : this.msgTocado="Touch is untouched.";
  this.dweet.with[0].content.getBotaoPressionado() == 1 ? this.msgBotao = "Button is pressed." : this.msgBotao="Button is unpressed.";
  this.msgStatus=this.dweet.with[0].content.getStatus();

}
}
