import { Component, OnInit } from '@angular/core';

import {MovieAPIdetails, StrukturaModel} from '../../movieAPIdetails.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../user.service';
import {firestore} from 'firebase/app';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-movie-api-details',
  templateUrl: './movie-api-details.page.html',
  styleUrls: ['./movie-api-details.page.scss'],
})
export class MovieAPIDetailsPage implements OnInit {
  private imdbID: string;
  pronadjenFilm: MovieAPIdetails
      = {

    Title: 'string',
    Year: 'string',
    Rated: 'string',
    Released: 'string',
    Runtime: 'string',

    Genre: 'string',
    Director: 'string',
    Writer: 'string',
    Actors: 'string',
    Plot: 'string',

    Language: 'string',
    Country: 'string',
    Awards: 'string',
    Poster: 'string',
    Ratings: null,
    // Ratings: [{Source: string, Value: string}];

    Metascore: 'string',
    imdbRating: 'string',
    imdbVotes: 'string',
    imdbID: 'string',
    Type: 'string',

    DVD: 'string',
    BoxOffice: 'string',
    Production: 'string',
    Website: 'string',
    Response: 'string'
  };


  private ruta1: string;
  sacuvan = false;

  constructor(public ruta: ActivatedRoute, public afsStore: AngularFirestore, public user: UserService,
              public alert: AlertController, public router: Router) {
  }

  ngOnInit() {
    this.imdbID = this.ruta.snapshot.paramMap.get('imdbID');

    // ucitavamo detalje za onaj film koji smo kliknuli! http://www.omdbapi.com/?i=tt1570728&apikey=4a249f8d
    try {
      fetch('http://www.omdbapi.com/?i=' + this.imdbID + '&apikey=4a249f8d')
          .then(response => response.json())
          .then(data => this.pronadjenFilm = data);
    } catch (e) {
      console.log(e);
    }
    // proveravamo da li je film sacuvan
    this.proveraSacuvanFilm();
  }
  // da se prveri da li je film sacuvan da bi se pojavila zuta zvezda
  proveraSacuvanFilm() {

    try {
      this.afsStore.collection('users').doc(this.user.getUserID()).get().subscribe(res => {
        res.data().sacuvaniFilmovi.forEach(film => {
          if (film.IDFilma === this.imdbID ) {
            this.sacuvan = true;
            console.log('jeste sacuvan');
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
  sacuvajFilm() {

    const IDFilma = this.imdbID;
    const imeFilma = this.pronadjenFilm.Title;
    const poster = this.pronadjenFilm.Poster;

    if (!this.sacuvan) {
      try {
        this.afsStore.doc(`users/` + this.user.getUserID()).update({
          sacuvaniFilmovi: firestore.FieldValue.arrayUnion({
            IDFilma,
            imeFilma,
            poster
          })
        });
        console.log('Sacuvan film');
        this.presentAlert('Done!', 'Film' + ' ' + this.pronadjenFilm.Title + ' je uspesno sacuvan!');
      } catch (e) {
        console.log(e);
      }
    } else {
      this.presentAlert(' ', 'Ovaj film je vec sacuvan!');
    }
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',

        handler: () => {

          this.router.navigateByUrl('/movies/tabs/home-page/movies-api-search');
        }
      }]
  });
    await alert.present();
  }
}
