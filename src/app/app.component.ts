import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Home } from '../pages/home/home';
import { TemperaturaPage } from '../pages/temperatura/temperatura';
import { LuminosidadePage } from '../pages/luminosidade/luminosidade';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController, 
        statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home },
      { title: 'Temperatura', component: TemperaturaPage },
      { title: 'Luminosidade', component: LuminosidadePage }
    ];

  }

  openPage(page) {
	
	this.menu.close();
  
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
