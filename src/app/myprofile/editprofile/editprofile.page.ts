import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UserService} from "../../user.service";


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
  @Input() imePrezime: string;
    @Input() mejlAdresa: string;

    constructor(private afs: AngularFirestore, private currentUser: UserService) {
      this.mainuser = afs.doc(`users/${currentUser.getUserID()}`)
        this.sub = this.mainuser.valueChanges().subscribe(event=>{
              this.imePrezime = event.name
             this.mejlAdresa = event.mejl
            this.imageURL = event.slika
        })
    }

  ngOnInit() {
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
}
