import { Component, OnInit } from '@angular/core';

import {MovieAPIdetails, StrukturaModel} from '../../movieAPIdetails.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../user.service';
import {firestore} from 'firebase/app';
import {AlertController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {map} from "rxjs/operators";
import {MovieModalComponent} from "../../movie-modal/movie-modal.component";
import {MoviesService} from "../../movies.service";
import {Subscription} from "rxjs";
import {Movie} from "../../movie.model";


@Component({
  selector: 'app-movie-api-details',
  templateUrl: './movie-api-details.page.html',
  styleUrls: ['./movie-api-details.page.scss'],
})
export class MovieAPIDetailsPage implements OnInit {
  private imdbID: string;
  isLoading=false;
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
              public alert: AlertController, public router: Router, private loadingCtrl: LoadingController,
              private alertController: AlertController, private navCtrl: NavController,
              private modalCtrl: ModalController, private moviesService: MoviesService) {
  }
  private moviesSub: Subscription;
  movies: Movie[];
  ngOnInit() {

    this.moviesSub = this.moviesService.movies.subscribe((movies) => {
      this.isLoading = false;
      this.movies = movies;
    });

    this.imdbID = this.ruta.snapshot.paramMap.get('imdbID');
    this.isLoading = true;
    // ucitavamo detalje za onaj film koji smo kliknuli! http://www.omdbapi.com/?i=tt1570728&apikey=4a249f8d
    try {
      fetch('http://www.omdbapi.com/?i=' + this.imdbID + '&apikey=4a249f8d')
          .then(response => response.json())
          .then(data => {
            this.pronadjenFilm = data;
            this.isLoading=false;
          });

    } catch (e) {
      console.log(e);
    }
    // proveravamo da li je film sacuvan
    this.proveraSacuvanFilm();
  }

  ionViewWillEnter(){
    console.log('izvrsen ion will enter')
    this.isLoading = true;
    this.moviesService.getMovies().subscribe(movieData =>{
      this.isLoading = false;
      console.log(movieData);
    });
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

  odgledan = false;

  proveraOdgledanFilm (naziv: string){
    this.movies.forEach(film => {
      if(film.naziv.toLowerCase() === naziv.toLowerCase()){
        this.odgledan = true;
        console.log('jeste odgledan je!!!!')
      }
    })
  }

  sacuvajFilm() {

    this.loadingCtrl.create({message: 'Čuvanje...'}).then(el => {
      el.present();

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
          el.dismiss();
          console.log('Sacuvan film');
          this.presentAlert('Done!', 'Film' + ' ' + this.pronadjenFilm.Title + ' je uspešno sačuvan!');
        } catch (e) {
          console.log(e);
        }
      } else {
        this.presentAlert(' ', 'Ovaj film je već sačuvan!');
      }
    });


  }

  otvoriModalzaDodavanje(){
  // uzima sve podatke od sacuvanog filma, a kom i ocenu dopisuje sam
   // var slicedRuntime = this.pronadjenFilm.Runtime.slice(0, 3);
    var str = this.pronadjenFilm.Runtime.substring(0, this.pronadjenFilm.Runtime.length-4); // od apija dobijamo trajanje u formatu 111 min, a mi uzimamo samo 111
    this.modalCtrl.create({
      component: MovieModalComponent,
      componentProps: {
        title: 'Dodaj film u moju listu odgledanih',
        trajanje: str,
        zanr: this.pronadjenFilm.Genre,
        glumci: this.pronadjenFilm.Actors,
        reziser: this.pronadjenFilm.Director,
        nazivFilma: this.pronadjenFilm.Title,
        //datum: this.movie.datum,
        godina: this.pronadjenFilm.Year,
       // komentar: this.movie.komentar,
        //ocena: this.movie.ocena,
        zemlja: this.pronadjenFilm.Country

      }
    }).then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    }).then(resultData =>{
      if(resultData.role === 'confirm'){
        this.proveraOdgledanFilm(resultData.data.movieData.nazivFilma);
          if(this.odgledan === true){
            this.presentAlert2('Greška', 'Film' + ' ' + this.pronadjenFilm.Title + ' već postoji u listi odgledanih filmova!');
          } else {
            this.loadingCtrl.create({message: 'Dodavanje...'}).then(el=>{
              el.present();
              console.log(resultData);
              this.moviesService
                  .addMovie(resultData.data.movieData.nazivFilma,resultData.data.movieData.glumci, resultData.data.movieData.reziser,
                      resultData.data.movieData.zanr, resultData.data.movieData.godina,resultData.data.movieData.trajanje,
                      resultData.data.movieData.datum, resultData.data.movieData.ocena,
                      resultData.data.movieData.komentar,
                      resultData.data.movieData.zemlja)
                  .subscribe(movies => {
                    console.log(movies);
                  });
              el.dismiss();
            })
            this.presentAlert1('Done!', 'Film' + ' ' + this.pronadjenFilm.Title + ' je uspešno dodat u listu odgledanih filmova!');
            // nakon dodavanja on se brise iz liste sacuvanih i vracamo se na prethodnu stranu
            this.afsStore.doc(`users/` + this.user.getUserID()).update({
              sacuvaniFilmovi:  firestore.FieldValue.arrayRemove({
                IDFilma: this.imdbID,
                imeFilma: this.pronadjenFilm.Title,
                poster: this.pronadjenFilm.Poster
              })
            })
            this.navCtrl.navigateBack('/movies/tabs/home-page');
          }
      }
    })
  }

  obrisiIzListe(){
    this.alertController.create({
      header: 'Ukloni film iz liste sačuvanih',
      message: 'Ukloni film?',
      buttons: [
        {
          text: 'Ukloni',

          handler: () => {


            this.loadingCtrl.create({message: 'Brisanje...'}).then(loadingEl => {

              loadingEl.present();

              this.afsStore.doc(`users/` + this.user.getUserID()).update({
               sacuvaniFilmovi:  firestore.FieldValue.arrayRemove({
                 IDFilma: this.imdbID,
                 imeFilma: this.pronadjenFilm.Title,
                 poster: this.pronadjenFilm.Poster
               })
              })
              console.log('Uklonjen film');
              loadingEl.dismiss();
              this.navCtrl.navigateBack('/movies/tabs/home-page');
            });


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

  async presentAlert1(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',

        handler: () => {

          this.router.navigateByUrl('/movies/tabs/home-page');
        }
      }]
    });
    await alert.present();
  }
  async presentAlert2(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK'
      }]
    });
    await alert.present();
  }

}
