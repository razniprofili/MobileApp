import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {}

  odjaviSe(){
    this.alertController.create({
      header: 'Odjava',
      message: 'Da li ste sigurni da zelite da se odjavite?',
      buttons: [
        {
          text: 'Odjava',

          handler: () => {
            console.log('Odjavljen'); //napravi da se odjavi korisnik
          }
        },
        {
          text: 'Odustani',
          role: 'cancel',
          handler: () => {
            console.log('odustao od odjave');
          }
        }
      ]
    }).then((alert)=>{
      alert.present();
    });
}
}
