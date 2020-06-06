import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "../../user.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  imePrezimeKorisnik ;
  userBase
  sub
  constructor(public alertController: AlertController, public authService: AuthService,
              public router: Router, private afAuth: AngularFireAuth, public afStore: AngularFirestore,
              private currentUser: UserService) { }

  ngOnInit() {
    this.userBase = this.afStore.collection('users').doc(this.currentUser.getUserID());
    this.sub = this.userBase.valueChanges().subscribe(event => {
      this.imePrezimeKorisnik = event.name + ' ' + event.surname;
    });
  }

  odjaviSe(){
    this.alertController.create({
      header: 'Odjava',
      message: 'Da li ste sigurni da zelite da se odjavite?',
      buttons: [
        {
          text: 'Odjava',

          handler: () => {
            console.log('Odjavljen'); //napravi da se odjavi korisnik
            //odjava
            this.authService.logout();
            this.afAuth.signOut();
            this.router.navigateByUrl("/log-in")

          }
        },
        {
          text: 'Odustani',
          role: 'cancel',
          handler: () => {
            console.log('odustao od odjave');
            //ovde zapravo nista ne treba da se desi...
          }
        }
      ]
    }).then((alert)=>{
      alert.present();
    });
}
}
