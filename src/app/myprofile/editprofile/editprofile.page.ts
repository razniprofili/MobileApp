import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

 @ViewChild('fileBtn', null) fileBtn: {
   nativeElement: HTMLInputElement
 };
 imageURL: string; // dobicemo iz baze link
  constructor() { }

  ngOnInit() {
  }
  // otvara se forma za dodavanje slike
  updateProfilPic() {
      this.fileBtn.nativeElement.click();
  }
  // menja se slika, odraditi kada dodje baza
  uploadPic(event) {
   // const files =event.target.files
   //
   //  const data = new FormData()
   //  data.append('file', files[0])
  }
    fileChanged(event) {
     const files = event.target.files;
     const data = new FormData();
     data.append('file', files[0]);
     console.log(data);
     // uzima se fajl i stavlja u bazu i zatim se vraca iz baze kao slika na profilu
    }
}
