import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../movie.model";

@Component({
  selector: 'app-movie-element',
  templateUrl: './movie-element.component.html',
  styleUrls: ['./movie-element.component.scss'],
})
export class MovieElementComponent implements OnInit {

  @Input() movie: Movie = {
    id: '11',
    naziv: 'Juzni vetar',
    glumci: 'Milos Bikovic,...',
    reziser: 'Milos Avramovic',
    zanr: 'akcija',
    zemlja: 'srpski',
    godina: 2018,
    trajanje: 130,
    ocena: 5,
    komentar: 'Odlican film pogledaj drugi deo obavezno!!',
    datum: "2020"

  };

  constructor() { }

  ngOnInit() {}

}
