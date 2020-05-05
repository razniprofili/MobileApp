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
        zanr: 'komedija',
        glumci: 'neki tamo glumci',
        ocena: 3,
        datum: '13.01.2019.',
        komentar: 'Neki tamo komentar',
          zemlja: 'neka',
          reziser: 'reziser 1',
          trajanje: 120
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
