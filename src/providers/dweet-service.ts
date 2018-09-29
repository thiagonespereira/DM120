import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DweetSettingsEnum } from './../enum/DweetSettingsEnum';
import { Content } from '../models/content';
import { Dweet } from "../models/dweet";
import { With } from "../models/with";
 
/*
  Generated class for the DweetServiceProvider provider.
 
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DweetServiceProvider {
 
  private dweetioApiUrl = DweetSettingsEnum.DWEET_URL_GET_ALL;
  private alarmeURL = DweetSettingsEnum.DWEET_ALARM;
 
  constructor(public http: HttpClient) {
    console.log('Hello DweetServiceProvider Provider');
  }
 
  loadLastDweets(thingName: string){
    console.log(thingName);
    return this.http.get(this.dweetioApiUrl + thingName)
  }

  sendAlarm(i: number){
    let body = {
      buzzer: i
      }
    
      //console.log(body);
    return this.http.post('https://dweet.io/dweet/for/coisabuzzertf',body).subscribe(
      data => console.log(data)
    )
  }
 
 
  preencherDweet(data: any){
    let dweet: Dweet;
    let _withs: Array<With>;
    let _date: string;
    let _time : string;
 
    _withs = new Array<With>();
 
    //console.log(data);
    for (let _with of data.with){
    
      let tempContent : Content;
      tempContent = new Content(_with.content.temperatura,
                                _with.content.luz,
                                _with.content.sendoTocado,
                                _with.content.botaoPressionado,
                                _with.content.status);
 
       _date = this.formatDate(_with.created);
       _time = this.formatTime(_with.created);
 
       let tempWith: With;
       tempWith = new With(_with.thing, _with.created, tempContent, _date, _time);

       _withs.push(tempWith);
 
    }
 
    dweet = new Dweet(data.this, data.by, data.the, _withs);
    //console.log(dweet);
    return dweet;
 
 
  }
 
  private formatDate(date: any): string{
 
    let originalDate : string = date;
 
    let dateParse = originalDate.slice(0,10);
 
    return dateParse;
  }
 
 
  private formatTime(date: any): string{
 
    let originalDate : string = date;
 
    let timeParse = originalDate.slice(11,19);
 
    return timeParse;
  }
 
 
 
 
}