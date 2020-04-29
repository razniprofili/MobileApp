import { Component, OnInit } from '@angular/core';
import {MovieAPI} from '../movieAPI.model';

import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
movies: MovieAPI[];
  public imeFilma: string;

  constructor(public alert: AlertController, public router: Router) { }

  ngOnInit() {
    // kad se ucita stranica pojave se npr ovi filmovi
    fetch('http://www.omdbapi.com/?s=love&type=movie&apikey=4a249f8d')
        .then(response => response.json())
        .then(res => this.movies = res.Search);
  }

  // prikaziDetalje(){
  //   this.router.navigateByUrl('movies/tabs/home-page/movie-api-details');
  // }

  pronadjiFilmove() {
    // tslint:disable-next-line:triple-equals
    if (this.imeFilma != null && this.imeFilma != ' ') {
      fetch('http://www.omdbapi.com/?s=' + this.imeFilma.trim().toLowerCase() + '&type=movie&apikey=4a249f8d')
          .then(response => response.json())
          .then(res => this.movies = res.Search);

      // if (this.movies.length === 0 || this.movies === null) {
      //   this.presentAlert('Greska', 'Ne postoji film sa unetim nazivom!')
      // }
    } else {

      this.presentAlert('Greska', 'Morate uneti naziv filma za pretragu!');
    }

  }

  sacuvaj() {
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
