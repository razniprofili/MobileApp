import { Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {Movie} from '../movie.model';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {MoviesService} from '../movies.service';

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

  constructor(public alertController: AlertController, private moviesService: MoviesService) { }

  ngOnInit() {
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
    console.log(result);
  }

  radioGroupChange(event) {
    //console.log("radioGroupChange", event.detail);
    this.itemR = JSON.parse(JSON.stringify(event.detail));
    this.selectedRadio = this.itemR['value'];
    this.selectedRadio = (this.selectedRadio);
    console.log(this.selectedRadio);
  }

  onChangeSelect(event) {
    this.itemO = JSON.parse(JSON.stringify(event.detail));
    this.selectedOption = this.itemO['value'];
    console.log(this.selectedOption);
  }

  onAddMovie() {
    if (!this.form.valid) {
      return;
    } else {
      console.log(this.form.value['naziv']);
      console.log(this.form.value['glumci']);
      console.log(this.form.value['reziser']);
      console.log(this.selectedOption);
      console.log(this.form.value['jezik']);
      console.log(this.form.value['godina']);
      console.log(this.form.value['trajanje']);
      console.log(this.selectedRadio);
      console.log(this.form.value['komentar']);

      this.moviesService
          .addMovie(this.form.value['naziv'], this.form.value['glumci'], this.form.value['reziser'], this.selectedOption, this.form.value['jezik'] , this.form.value['godina'], this.form.value['trajanje'], this.selectedRadio, this.form.value['komentar'] )
          .subscribe(movies => {
            console.log(movies);
          });

    }

  }

}
