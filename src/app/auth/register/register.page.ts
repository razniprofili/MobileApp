import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import {UserService} from '../../user.service';
import {AuthService} from '../auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  name: string;
  surname: string;
  mejl: string;
  sifra: string;
  sifra2: string;
  slika = 'https://forum.mikrotik.com/styles/canvas/theme/images/no_avatar.jpg';
  // sacuvaniFilmovi: string[];
  greska = false;
  tekstGreske: string

  constructor(public alert: AlertController, public afAuth: AngularFireAuth,
              public router: Router, public user: UserService,
              public authService: AuthService, public afStore: AngularFirestore,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.registerForm = new FormGroup( {
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
 async onRegister() {
   const{mejl, sifra, sifra2, name, surname, slika } = this;
   if (this.registerForm.valid) {
      if (this.sifra !== this.sifra2) {
        this.presentAlert('Greška', 'Šifre se ne poklapaju, pokušajte ponovo.');
      } else {
        try {
          const res = await this.afAuth.createUserWithEmailAndPassword(mejl, sifra);
          this.greska = false;
          console.log(res);
         // this.authService.login();
          this.user.setUser({ mejl, sifra, userID: res.user.uid});
          this.afStore.doc(`users/` + res.user.uid).set({
              mejl,
              sifra,
              name,
              surname,
              slika
              // sacuvaniFilmovi: firestore.FieldValue.arrayUnion({
              //    // kreirace ovaj niz filmova sa  defValue: '', pa yato u prebrojavanju filmova imamo -1
              // })
          });
          this.presentAlert('', 'Uspešna registracija!');
          this.router.navigateByUrl('/movies');
        } catch (e) {
          console.dir(e);
          if (e.code === 'auth/email-already-in-use') {

              this.greska = true;

          }
        }
        console.log(this.registerForm);
      }

    } else {
      this.presentAlert('', 'Popunite polja koja nedostaju!');
      if (this.greska === true) {
          this.greska = false;
      }
    }
  }
  vecPostoji= false;
  async  onRegister2() {
      const{mejl, sifra, sifra2, name, surname, slika } = this;
      if (this.registerForm.valid) {
          if (this.sifra !== this.sifra2) {
              this.presentAlert('Greška', 'Šifre se ne poklapaju, pokušaj ponovo.');
          } else {
              this.loadingCtrl.create({message: 'Registracija...'}).then(el=>{
                  el.present();
                  console.log(this.registerForm);
                  this.authService.register(this.registerForm.value).subscribe(resData => {
                          //console.log('Registracija uspesna');
                          console.log(resData);
                          this.greska = false;
                          this.user.setUser({ mejl, sifra, userID: resData.localId});
                          this.afStore.doc(`users/` + resData.localId).set({
                              mejl,
                              sifra,
                              name,
                              surname,
                              slika
                          });
                          el.dismiss();
                          this.presentAlert('', 'Uspešna registracija!');
                          this.router.navigateByUrl('/movies');
                      },
                      errRes=>{
                          this.greska = true;
                          const textGreske= errRes.error.error.message;
                          console.log(errRes)
                          console.log(textGreske)
                          el.dismiss();
                          if(textGreske === 'INVALID_EMAIL') {
                              this.tekstGreske ='E-mail adresa nije u odgovarajućem formatu!'
                          } else {
                              if(textGreske === 'EMAIL_EXISTS') {
                                  this.vecPostoji = true;
                                  this.tekstGreske ='Nalog sa ovim e-mailom već postoji!'
                              } else {
                                  this.tekstGreske ='Desila se greška, pokušaj kasnije!'
                              }
                          }
                      });
              })

          }
      } else {
          this.presentAlert('', 'Popuni polja koja nedostaju!');
          if (this.greska === true) {
              this.greska = false;
          }
      }

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
