import { Component, OnInit } from '@angular/core';
import {MovieAPI} from '../../movieAPI.model';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-movies-api-search',
  templateUrl: './movies-api-search.page.html',
  styleUrls: ['./movies-api-search.page.scss'],
})
export class MoviesApiSearchPage implements OnInit {

  movies: MovieAPI[];
  bojaIkonice: string;
  public imeFilma: string;
  sacuvan = false;

  constructor(public alert: AlertController, public router: Router, public afStore: AngularFirestore,
              public currentUser: UserService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // kad se ucita stranica pojave se npr ovi filmovi
    // fetch('http://www.omdbapi.com/?s=love&type=movie&apikey=4a249f8d')
    //     .then(response => response.json())
    //     .then(res => this.movies = res.Search);
    // this.proveraSacuvanFilm();
  }


  // prikaziDetalje(){
  //   this.router.navigateByUrl('movies/tabs/home-page/movie-api-details');
  // }

  pronadjiFilmove() {
      this.loadingCtrl.create({message: 'Pretraga...'}).then(el =>{


          //ovde ide nasa fja:
          // tslint:disable-next-line:triple-equals
          if (this.imeFilma != null && this.imeFilma != ' ') {
              el.present();
              try {
                  fetch('http://www.omdbapi.com/?s=' + this.imeFilma.trim().toLowerCase() + '&type=movie&apikey=4a249f8d')
                      .then(response => response.json())
                      .then(res => {
                          el.dismiss();
                              this.movies = res.Search;
                              console.log(res);
                              if (res.Error === 'Movie not found!') {
                                  this.presentAlert('', 'Nema rezultata pretrage za ' + this.imeFilma);
                              }
                              if (res.Error === 'Too many results.') {
                                  this.presentAlert('', 'Previse poklapanja, poboljsajte kriterijum pretrage!');
                              }
                          }

                      );
              } catch (e) {
                  console.log(e);
              }
          } else {

              this.presentAlert('Greska', 'Morate uneti naziv filma za pretragu!');
          }
      });

  }

  sacuvaj() {
    // this.bojaIkonice = '#F7900A';
    console.log('sacuvan');

  }



  // da iskoci upozorenje tj obavestenje o logovanju, greski...
  async presentAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

}
