import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  mejl: string;
  sifra: string;
  greska = false;

  constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth, public user: UserService) { }

  ngOnInit() {
  }
 async onLogIn(form: NgForm) {

    const{mejl, sifra} = this;
    if (form.valid) {
      try {
        const res = await this.afAuth.signInWithEmailAndPassword(mejl, sifra);
        console.log(res);
        this.greska = false;
        this.authService.login(); // da se upamti da smo ulogovani
        this.user.setUser({ mejl, sifra, userID: res.user.uid});
        this.router.navigateByUrl('/movies'); // kada se ulogujemo idemo na ovu stranicu

      } catch (e) {
        console.dir(e);
        if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' ) {
            this.greska = true;
        }
      }
    }
  }

}
