import {Component, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

 @ViewChild('fileBtn',null) fileBtn: {
   nativeElement: HTMLInputElement
 }
  constructor() { }

  ngOnInit() {
  }
  //otvara se forma za dodavanje slike
  updateProfilPic(){
      this.fileBtn.nativeElement.click()
  }
  //menja se slika, odraditi kada dodje baza
  uploadPic(event){
   // const files =event.target.files
   //
   //  const data = new FormData()
   //  data.append('file', files[0])
  }
}
