import { Component, OnInit } from '@angular/core';
import {MovieAPI} from '../movieAPI.model';

import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {UserService} from '../../user.service';
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  movies;
  sub;
  moviesPretraga=this.movies;
 // public imeFilma: string;
  public queryText: string;
  userBase: AngularFirestoreDocument;
  prazno = true;
  isLoading = false;

  constructor(public alert: AlertController, public router: Router, public afStore: AngularFirestore,
              public user: UserService, public afAuth: AngularFireAuth) {
    // this.userBase = this.afStore.collection('users').doc(this.user.getUserID());
    // this.sub = this.userBase.valueChanges().subscribe(event => {
    //   this.movies = event.sacuvaniFilmovi;
    //   console.log(event.sacuvaniFilmovi);
    // });

  }

  ngOnInit() {
      this.inicijalizuj();
  }
otvoriPretragu() {
      this.router.navigateByUrl('/movies/tabs/home-page/movies-api-search');
}




  async presentAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  inicijalizuj() {

    this.prazno =false;
    this.isLoading = true;

    this.userBase = this.afStore.collection('users').doc(this.user.getUserID());
    this.sub = this.userBase.valueChanges().subscribe(event => {
        this.isLoading = false;
        this.movies = event.sacuvaniFilmovi;
        this.moviesPretraga = event.sacuvaniFilmovi;
        console.log(event.sacuvaniFilmovi);
        if(event.sacuvaniFilmovi === undefined){
            this.prazno = true;
        } else {
            if (event.sacuvaniFilmovi.length ===0) {
                this.prazno = true;
            } else {
                this.prazno = false;
            }
        }

    });
  }

    searchMovies(ev: any) {

    this.movies = this.moviesPretraga;

    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.movies = this.movies.filter((item) => {
        return (item.imeFilma.toLocaleLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

  }

}
