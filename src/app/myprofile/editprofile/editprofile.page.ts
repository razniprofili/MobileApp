import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UserService} from "../../user.service";
import * as firebase from "firebase";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

 @ViewChild('fileBtn', {static: true}) fileBtn: {
   nativeElement: HTMLInputElement
 };

  imageURL : string; // dobicemo iz baze link
  mainuser: AngularFirestoreDocument;
  sub
  busy: boolean = false

  @Input() ime: string;
  @Input() mejlAdresa: string;
  @Input() prezime: string;

    password: string = ''
    newPassword: string
    userPassword: string
    userIme: string
    userPrezime: string
    kratkaSifra : boolean = false

    constructor(private afs: AngularFirestore, private currentUser: UserService, private alContr: AlertController, private router: Router, public afAuth: AngularFireAuth) {
      this.mainuser = afs.doc(`users/${currentUser.getUserID()}`)
        this.sub = this.mainuser.valueChanges().subscribe(event=>{
              this.ime = event.name
              this.prezime = event.surname
              this.mejlAdresa = event.mejl
              this.imageURL = event.slika
              this.userPassword = event.sifra
        })
    }

  ngOnInit() {
  }

  ngOnDestroy(){
        this.sub.unsubscribe()
  }
  // otvara se forma za dodavanje slike
  updateProfilPic() {
      this.fileBtn.nativeElement.click();
  }

  // menja se slika, odraditi kada dodje baza
  uploadPic(event) {
   const files =event.target.files

    const data = new FormData()
    data.append('file', files[0])
    //  this.imageURL = data;
  }
    fileChanged(event) {
     const files = event.target.files;
     const data = new FormData();
     data.append('file', files[0]);
     console.log(data);
     // uzima se fajl i stavlja u bazu i zatim se vraca iz baze kao slika na profilu
    }

    async presentAlert(naslov: string, tekst: string){
      const alert = await this.alContr.create({
          header: naslov,
          message: tekst,
          buttons: ['OK']
      })
        await alert.present()
    }
   async sacuvajPromene(){

        // moze da se izmeni samo ako unese sifru
        if(this.password === ''){
             this.presentAlert('Greska','Sifra nije uneta!')
        } else {
            //... i samo ako je ispravna
            if(this.password === this.userPassword){

                if(this.newPassword){
                    if(this.newPassword.length < 8){
                        this.kratkaSifra = true;
                    } else{
                        this.kratkaSifra = false;
                        // prilikom izmene sifre u pozadini mora ponovo da se prijavi korisnik ...
                        const res = await this.afAuth.signInWithEmailAndPassword(this.currentUser.getUserMail(), this.userPassword);

                        await this.currentUser.updatePassword(this.newPassword)
                        //menjamo sifru i u cloud store-u:
                        this.mainuser.update({
                            sifra: this.newPassword
                        })
                    }

                }

                //ako je mejl razlicit od prethodnog, znaci da je i njega promenio:
                if(this.mejlAdresa !== this.currentUser.getUserMail()){
                    await this.currentUser.updateEmail(this.mejlAdresa)
                    //menjamo adresu i u cloud store-u:
                    this.mainuser.update({
                        mejl: this.mejlAdresa
                    })
                }

                if(this.ime !== this.userIme){

                    this.mainuser.update({
                        name: this.ime
                    })
                }

                if(this.prezime !== this.userPrezime){

                    this.mainuser.update({
                        surname: this.prezime
                    })
                }

                if(this.kratkaSifra === false){
                    this.password = ""
                    this.newPassword = ""
                    await this.presentAlert('Done!', 'Profil je uspesno azuriran!')
                    this.router.navigateByUrl('/movies/tabs/myprofile');
                }

            } else {
                this.presentAlert('Greska','Uneta je pogresna sifra, pokusaj ponovo!')
                this.password = ''
            }
        }

    }
}
