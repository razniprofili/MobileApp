import { Component, OnInit } from '@angular/core';

import {MovieAPIdetails, StrukturaModel} from '../../movieAPIdetails.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-api-details',
  templateUrl: './movie-api-details.page.html',
  styleUrls: ['./movie-api-details.page.scss'],
})
export class MovieAPIDetailsPage implements OnInit {
  private imdbID: string;
   pronadjenFilm: MovieAPIdetails
   = {

    Title: 'string',
  Year: 'string',
  Rated: 'string',
  Released: 'string',
  Runtime: 'string',

  Genre: 'string',
  Director: 'string',
  Writer: 'string',
  Actors: 'string',
  Plot: 'string',

  Language: 'string',
  Country: 'string',
  Awards: 'string',
  Poster: 'string',
  Ratings: null,
  // Ratings: [{Source: string, Value: string}];

  Metascore: 'string',
  imdbRating: 'string',
  imdbVotes: 'string',
  imdbID: 'string',
  Type: 'string',

  DVD: 'string',
  BoxOffice: 'string',
  Production: 'string',
  Website: 'string',
  Response: 'string'
  };


  private ruta1: string;
  constructor(public ruta: ActivatedRoute) { }

  ngOnInit() {
    this.imdbID = this.ruta.snapshot.paramMap.get('imdbID');

    // ucitavamo detalje za onaj film koji smo kliknuli! http://www.omdbapi.com/?i=tt1570728&apikey=4a249f8d
    fetch('http://www.omdbapi.com/?i=' + this.imdbID + '&apikey=4a249f8d')
        .then(response => response.json())
         .then(data => this.pronadjenFilm = data);

  }

}
