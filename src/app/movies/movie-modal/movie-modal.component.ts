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
  @Input() trajanje : number;
  @Input() datum : string;
  @Input() ocena : string;

  @ViewChild('f', {static: true}) form: NgForm;

  itemR: any;
  itemO: any;
  selectedOptionZanr: any;
  selectedOptionOcena: any;

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

  onChangeSelectOcena(event) {
    this.itemR = JSON.parse(JSON.stringify(event.detail));
    this.selectedOptionOcena = this.itemR['value'];
    console.log(this.selectedOptionOcena);
  }



  potvrdiIzmene(){
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      movieData:{
        trajanje: this.form.value['trajanje'],
        zanr: this.selectedOptionZanr,
        glumci: this.form.value['glumci'],
        reziser: this.form.value['reziser'],
        nazivFilma: this.form.value['text'],
        datum: this.form.value['datum'],
        godina: this.form.value['godina'],
        komentar: this.form.value['komentar'],
        ocena: this.selectedOptionOcena,
        zemlja: this.form.value['zemlja'],
      }
    }, 'confirm');
  }
}
