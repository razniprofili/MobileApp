import { Component, OnInit } from '@angular/core';
import {Movie} from '../../movie.model';
import {AlertController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {MoviesService} from "../../movies.service";
import {UserService} from "../../../user.service";
import {MovieModalComponent} from "../../movie-modal/movie-modal.component";

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
          trajanje: 120,
          godina: 2020
      };
   isLoading = false;

  constructor(public alertController: AlertController, public route: ActivatedRoute,
              public navCtrl: NavController, public moviesService: MoviesService,
              public loadingCtrl: LoadingController, public currentUSer: UserService,
              private modalCtrl: ModalController
  ) { }

  userID = this.currentUSer.getUserID();
  ngOnInit() {
      this.route.paramMap.subscribe((paramMap)=>{
          if(!paramMap.has('movieId')){
              this.navCtrl.navigateBack('/movies/tabs/search-movie');
              return;
          }
          this.isLoading = true;
          this.moviesService.getMovie(paramMap.get('movieId'), this.userID)
              .subscribe(movie=>{
                  this.isLoading = false;
                  this.movie = movie;
              });
      })
  }

  izmeni(){
      //mora da se otvori str za dodavanje, da se izmene polja
      //this.modalCtrl.create

      this.modalCtrl.create({
          component: MovieModalComponent,
          componentProps: {
              title: 'Izmena',
              trajanje: this.movie.trajanje,
              zanr: this.movie.zanr,
              glumci: this.movie.glumci,
              reziser: this.movie.reziser,
              nazivFilma: this.movie.naziv,
              datum: this.movie.datum,
              godina: this.movie.godina,
              komentar: this.movie.komentar,
              ocena: this.movie.ocena,
              zemlja: this.movie.zemlja

          }
      }).then((modal) => {
          modal.present();
          return modal.onDidDismiss();
      }).then(resultData =>{
          if(resultData.role === 'confirm'){
              console.log(resultData);

              this.moviesService.editMovie(this.movie.id, this.currentUSer.getUserID(),resultData.data.movieData.nazivFilma, resultData.data.movieData.trajanje,
                  resultData.data.movieData.zanr, resultData.data.movieData.zemlja, resultData.data.movieData.glumci, resultData.data.movieData.ocena,
                  resultData.data.movieData.datum, resultData.data.movieData.komentar,
                  resultData.data.movieData.reziser, resultData.data.movieData.godina).subscribe((res)=>{

                  this.movie.naziv = resultData.data.movieData.nazivFilma;
                  this.movie.trajanje= resultData.data.movieData.trajanje;
                  this.movie.zanr= resultData.data.movieData.zanr;
                  this.movie.glumci = resultData.data.movieData.glumci;
                  this.movie.reziser = resultData.data.movieData.reziser;
                  this.movie.datum=resultData.data.movieData.datum;
                  this.movie.godina=resultData.data.movieData.godina;
                  this.movie.komentar=resultData.data.movieData.komentar;
                  this.movie.ocena=resultData.data.movieData.ocena;
                  this.movie.zemlja=resultData.data.movieData.zemlja;


              });
          }
      })
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

                      this.loadingCtrl.create({message: 'Brisanje...'}).then(loadingEl => {

                          loadingEl.present();

                          this.moviesService.deleteMovie(this.movie.id, this.userID).subscribe(()=>{
                              loadingEl.dismiss();
                              this.navCtrl.navigateBack('/movies/tabs/search-movie');
                          });
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

}
