import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent implements OnInit {

  @Input() title: string;
  @Input() nazivFilma: string;
  @Input() zanr: string;
  @Input() glumci : string;
  @Input() komentar : string;
  @Input() reziser : string;
  @Input() zemlja : string;
  @Input() godina : string;
  @Input() trajanje : string;
  @Input() datum : any;
  @Input() ocena : string;

  @ViewChild('f', {static: true}) form: NgForm;

  itemR: any;
  itemO: any;
  selectedOptionZanr: any;
  selectedOptionOcena: any;
  itemD: any;
  selectedDate: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onChangeSelectZanr(event) {
    this.itemO = JSON.parse(JSON.stringify(event.detail));
    this.selectedOptionZanr = this.itemO['value'];
    console.log(this.selectedOptionZanr);
  }
  izmenjenDatum = false;
  pomDatum: any
  dateTimeChange(event) {
    this.itemD = JSON.parse(JSON.stringify(event.detail));
    this.selectedDate = this.itemD['value'];
    this.izmenjenDatum = true;
    console.log(this.selectedDate);
  }
  izmenjenaOcena = false;
  pomOcena: any
  onChangeSelectOcena(event) {
    this.itemR = JSON.parse(JSON.stringify(event.detail));
    this.selectedOptionOcena = this.itemR['value'];
    this.izmenjenaOcena = true;
    console.log(this.selectedOptionOcena);
  }

  promenaOcene(){
    if(this.izmenjenaOcena === true){
      this.pomOcena = this.selectedOptionOcena;
    } else{
      this.pomOcena = this.ocena;
    }
  }

  promenaDatuma(){
    if(this.izmenjenDatum === true){
      this.pomDatum = this.selectedDate;
      console.log(this.pomDatum)
    } else{
      this.pomDatum = this.datum;
    }
  }

  potvrdiIzmene(){
    if (!this.form.valid) {
      return;
    }
    this.promenaOcene();
    this.promenaDatuma();

    this.modalCtrl.dismiss({

      movieData:{
        trajanje: this.form.value['trajanje'],
        zanr: this.form.value['zanr'],
        glumci: this.form.value['glumci'],
        reziser: this.form.value['reziser'],
        nazivFilma: this.form.value['text'],
        datum: this.pomDatum,
        godina: this.form.value['godina'],
        komentar: this.form.value['komentar'],
        ocena: this.pomOcena,
        zemlja: this.form.value['zemlja'],
      }
    }, 'confirm');
  }
}
