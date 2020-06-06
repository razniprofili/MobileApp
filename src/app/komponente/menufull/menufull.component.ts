import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-menufull',
  templateUrl: './menufull.component.html',
  styleUrls: ['./menufull.component.scss'],
})
export class MenufullComponent implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {}

  odjaviSe(){
    this.alertController.create({
      header: 'Odjava',
      message: 'Da li si siguran/a da zelis da se odjavite?',
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
