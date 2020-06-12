import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from "../auth/auth.service";
import {AlertController, LoadingController} from "@ionic/angular";


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  imePrezime: string;
  mejlAdresa: string;
  brojSacuvanih = 0;
  slikaKorisnika: string;
  filmovi;
  sacuvaniFilmovi;
  userBase;
  sub;
  constructor(private router: Router, public afStore: AngularFirestore, private currentUser: UserService,
              private authService: AuthService, private alert: AlertController, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.mejlAdresa = this.currentUser.getUserMail();
    // this.afStore.collection('users').get().subscribe(res => {
    //   console.log(res.docs);
    // });
    // this.afStore.collection('users', ref => ref.where('user', '==', this.currentUser.getUserID())).get().subscribe(res => {
    //   res.docs.forEach(doc => {
    //     console.log(doc.data().name); // prikazace samo imena svih korisnika
    //   });
    // });
    // this.afStore.collection('users').doc(this.currentUser.getUserID()).get().subscribe(res => {
    //   // console.log(res.data().name);
    //   this.imePrezime = res.data().name + ' ' + res.data().surname;
    //   this.slikaKorisnika = res.data().slika;
    //   try {
    //     this.brojSacuvanih = res.data().sacuvaniFilmovi.length;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //
    //  // console.log(res.data().sacuvaniFilmovi.length);
    // });
    this.userBase = this.afStore.collection('users').doc(this.currentUser.getUserID());
    this.sub = this.userBase.valueChanges().subscribe(event => {

        this.imePrezime = event.name + ' ' + event.surname;
        this.slikaKorisnika = event.slika;
        this.mejlAdresa = event.mejl;
        try {
          this.brojSacuvanih = event.sacuvaniFilmovi.length;
        } catch (e) {
          console.log(e);
        }
    });
  }

  otvoriStranuZaIzmenu() {

      this.loadingCtrl.create().then(el => {
          el.present();
          this.router.navigateByUrl('/myprofile/editprofile');
          el.dismiss();
      });
  }
ngOnDestroy(){
    this.sub.unsubscribe();
}
    deaktivacijaNaloga(){
         this.authService.deleteAccount();
        this.presentAlert('', 'Uspesna registracija!');
        this.router.navigateByUrl('/register');
    }
    async presentAlert(title: string, content: string) {
        const alert = await this.alert.create({
            header: title,
            message: content,
            buttons: ['OK']
        });

        await alert.present();
    }

}
