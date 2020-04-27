import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {Movie} from '../movie.model';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {

  constructor(public alertController: AlertController) { }

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


}
