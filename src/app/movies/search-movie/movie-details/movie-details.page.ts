import { Component, OnInit } from '@angular/core';
import {Movie} from '../../movie.model';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie: Movie =
      {
        id: '111',
        naziv: 'Treci film',
        glumci: 'neki tamo glumci',
          reziser: 'reziser 1',
          zanr: 'komedija',
          jezik: 'neka',
          godina: 2018,
          trajanje: 120,
          ocena: 3,
        komentar: 'Neki tamo komentar'
      };

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  openAlert() {
       this.alertController.create({
          header: 'Obrisi film',
          message: 'Da li ste sigurni da zelite da obrisete film?',
          buttons: [
              {
                  text: 'Obrisi',

                  handler: () => {
                      console.log('Obrisan film'); // napravi da se brise  iz baze i iz liste filmova
                  }
              },
              {
                  text: 'Odustani',
                  role: 'cancel',
                  handler: () => {
                      console.log('odustao od brisanja');
                  }
              }
          ]
      }).then((alert) => {
          alert.present();
       });


  }

}
