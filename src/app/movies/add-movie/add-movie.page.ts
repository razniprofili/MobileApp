import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {Movie} from '../movie.model';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {MoviesService} from '../movies.service';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;

  movies: Movie[] = [];
  selectedRadio: any;
  selectedOption: any;
  itemR: any;
  itemO: any;
  itemD: any;
  selectedDate: any;
  private moviesSub: Subscription;
  sacuvan = false;
  isLoading = false;


  zanrovi = [] = [
    { id: 0, name: 'Avantura', value: 'Avantura' },
    { id: 1, name: 'Akcioni', value: 'Akcioni'},
    { id: 2, name: 'Animacija', value: 'Animacija'},
    { id: 3, name: 'Biografski', value: 'Biografski' },
    { id: 4, name: 'Vestern', value:  'Vestern' },
    { id: 5, name: 'Dečiji', value: 'Dečiji'},
    { id: 6, name: 'Dokumentarni', value: 'Dokumentarni'},
    { id: 7, name: 'Drama', value: 'Drama' },
    { id: 8, name: 'Istorijski', value: 'Istorijski' },
    { id: 9, name: 'Komedija', value: 'Komedija'},
    { id: 10, name: 'Kartki', value: 'Kartki'},
    { id: 11, name: 'Kriminalistički', value: 'Kriminalistički' },
    { id: 12, name: 'Ljubavni', value: 'Ljubavni' },
    { id: 13, name: 'Misterija', value:  'Misterija'},
    { id: 14, name: 'Mjuzikl', value: 'Mjuzikl'},
    { id: 15, name: 'Muzički', value: 'Muzički' },
    { id: 16, name: 'Naučno-fantastični', value: 'Naučno-fantastični' },
    { id: 17, name: 'Porodični', value: 'Porodični'},
    { id: 18, name: 'Ratni', value: 'Ratni'},
    { id: 19, name: 'Sportski', value: 'Sportski' },
    { id: 20, name: 'Triler', value: 'Triler' },
    { id: 21, name: 'Fantastika', value: 'Fantastika'},
    { id: 22, name: 'Horor', value: 'Horor'}
  ];


  constructor(public alertController: AlertController, private moviesService: MoviesService,
              public navCtrl: NavController, public loadingCtrl: LoadingController) {}

  ngOnInit() {
    console.log('ngOnInit');
      this.isLoading = true;
      this.moviesService.getMovies().subscribe(movieData => {
        console.log(movieData);
        this.movies=movieData;
        this.isLoading = false;

    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Dodaj žanr !',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Unesi naziv žanra...'
        },

      ],
      buttons: [
        {
          text: 'Odustani',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Dodaj',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result.data.values['name1']);
    this.zanrovi.push({ id: 23, name: result.data.values['name1'], value: result.data.values['name1']});

  }

  openAlert() {
    this.alertController.create({
      header: 'Sačuvaj film',
      message: 'Da li želiš da sačuvaš film?',
      buttons: [
        {
          text: 'Sačuvaj',

          handler: () => {
            console.log('Sačuvan film');

            this.loadingCtrl.create({message: 'Čuvanje...'}).then(loadingEl => {

              loadingEl.present();
              //this.onAddMovie();
              if (!this.form.valid) {
                return;
              } else {
                console.log(this.form.value['naziv']);
                console.log(this.form.value['glumci']);
                console.log(this.form.value['reziser']);
                console.log(this.selectedOption);
                console.log(this.form.value['zemlja']);
                console.log(this.form.value['godina']);
                console.log(this.form.value['trajanje']);
                console.log(this.selectedRadio);
                console.log(this.form.value['komentar']);
                console.log(this.selectedDate);
              }

              if(this.postoji(this.form.value['naziv'])==true){
                //vec postoji takav film u bazi
                this.presentAlert(' ', 'Film sa nazivom '+this.form.value['naziv']+' se već nalazi u bazi!');
                loadingEl.dismiss();
                this.form.reset();

              }else {
                try {
                  this.moviesSub = this.moviesService
                      .addMovie(this.form.value['naziv'], this.form.value['glumci'], this.form.value['reziser'],
                          this.selectedOption, this.form.value['godina'], this.form.value['trajanje'],
                          this.selectedDate, this.selectedRadio, this.form.value['komentar'], this.form.value['zemlja'])
                      .subscribe(movies => {
                        console.log(movies);
                        this.sacuvan = true;
                        loadingEl.dismiss();
                        this.presentAlert(' ', 'Film je uspešno sačuvan!');
                        this.form.reset();
                        this.navCtrl.navigateBack('/movies/tabs/search-movie');

                      });
                } catch (e) {
                  this.presentAlert(' ', 'Greška prilikom čuvanja. Probaj opet!');
                  console.log(e);
                }
              }
            });


          }
        },
        {
          text: 'Odustani',
          role: 'cancel',
          handler: () => {
            console.log('odustao od cuvanja');

          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });


  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'OK',

        handler: () => {
          console.log('Confirm Ok');
        }
      }]
    });
    await alert.present();
  }


  radioGroupChange(event) {
    //console.log("radioGroupChange", event.detail);
    this.itemR = JSON.parse(JSON.stringify(event.detail));
    this.selectedRadio = this.itemR['value'];
    this.selectedRadio = (this.selectedRadio);
    console.log(this.selectedRadio);
  }
  dateTimeChange(event) {
    this.itemD = JSON.parse(JSON.stringify(event.detail));
    this.selectedDate = this.itemD['value'].trim();
    console.log(this.selectedDate);
  }

  onChangeSelect(event) {
    this.itemO = JSON.parse(JSON.stringify(event.detail));
    this.selectedOption = this.itemO['value'];
    console.log(this.selectedOption);
  }

  postoji(naziv:String):boolean{
    for(let i=0; i<this.movies.length; i++){
      console.log(this.movies[i].naziv.trim().toLowerCase());
      if(this.movies[i].naziv.trim().toLowerCase() === naziv.trim().toLowerCase()){
        console.log(naziv.trim().toLowerCase());
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(){
    console.log('ngOnDestroy');
    if(this.moviesSub){
      this.moviesSub.unsubscribe();
    }
  }

}
