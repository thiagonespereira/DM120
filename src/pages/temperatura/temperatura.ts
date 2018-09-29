import { Component } from '@angular/core';

import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';
import { DweetServiceProvider } from '../../providers/dweet-service';
import { Dweet } from '../../models/dweet';


@IonicPage()
@Component({
  selector: 'page-temperatura',
  templateUrl: 'temperatura.html'
})
export class TemperaturaPage {

  private thingName: any;
  private dweet: Dweet;
  private isLoading:boolean=true;
  private time:any;
  private dataPlot:Array<any>;
  options:Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dweetService:DweetServiceProvider) {
    this.thingName=DweetSettingsEnum.DWEET_NAME;
    this.time = setInterval(()=>{this.getLastDweets()},3000)
  }

  ngOnInit(){
    
    //this.getLastDweets();
  }

  ngOnDestroy(){
    clearInterval(this.time);
  }

  ionViewDidLoad(){
    console.log("Hello ")
  }

  private getLastDweets(){
      this.dataPlot=[];
      this.dweetService.loadLastDweets(this.thingName)
      
      .subscribe(data => 
        this.preencherDweet(data),
        
      err=>console.log(),
      ()=>
        this.isLoading=false
      );
  }
  private preencherDweet(data:any){
    //console.log(data);
    this.dweet=this.dweetService.preencherDweet(data);
    console.log(this.dweet);
    this.loadDataForPlot(this.dweet);
    this.plotChart();
}
  private loadDataForPlot(dweet:Dweet){
    for(let _with of dweet.with){
      let epoch=new Date(_with.created).getTime();
      this.dataPlot.push([epoch,_with.content.getTemperatura()]);
    }
  }

  private plotChart(){
    this.options={
      xAxis:{
        type:'dataTime'
      },
      yAxis:{
        labels:{
          formater:function(){return this.value + '°C'}
        },        
      },
      title:{
        text:'TEMPERATURA '
      },
      series:[{
        name:'temperatura',
        data:this.dataPlot.reverse(),
        pointInterval: 60* 60
      }]
    };
  }
}
