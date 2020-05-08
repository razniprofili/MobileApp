import { Component, OnInit } from '@angular/core';
import {Movie} from "../movie.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  movies: Movie[];

  constructor(private router: Router) {
    this.inicijalizuj();
  }
  inicijalizuj() {
    this.movies  = [
      {
        id: '11',
        naziv: 'Juzni vetar',
        glumci: 'Milos Bikovic,...',
        reziser: 'Milos Avramovic',
        zanr: 'akcija',
        jezik: 'srpski',
        godina: 2018,
        trajanje: 130,
        ocena: 5,
        komentar: 'Odlican film pogledaj drugi deo obavezno!!'

      }];
  }
  ngOnInit() {
  }

}
