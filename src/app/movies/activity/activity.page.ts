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
        zanr: 'akcija',
        glumci: 'MIlos Bikovic,...',
        ocena: 5,
        datum: '22.11.2019.',
        komentar: 'Odlican film pogledaj drugi deo obavezno!!',
        trajanje: 120,
        reziser: "nek",
        zemlja: "srb"
      }]}
  ngOnInit() {
  }

}
