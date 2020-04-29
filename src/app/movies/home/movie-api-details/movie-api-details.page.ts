import { Component, OnInit } from '@angular/core';

import {MovieAPIdetails} from '../../movieAPIdetails.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-api-details',
  templateUrl: './movie-api-details.page.html',
  styleUrls: ['./movie-api-details.page.scss'],
})
export class MovieAPIDetailsPage implements OnInit {
  private imdbID: string;
  private pronadjenFilm: MovieAPIdetails;

  private ruta1: string;
  constructor(public ruta: ActivatedRoute) { }

  ngOnInit() {
    this.imdbID = this.ruta.snapshot.paramMap.get('imdbID');
    this.ruta1 = 'http://www.omdbapi.com/?i=' + this.imdbID + '&apikey=4a249f8d';
    // ucitavamo detalje za onaj film koji smo kliknuli! http://www.omdbapi.com/?i=tt1570728&apikey=4a249f8d
    fetch('http://www.omdbapi.com/?i=' + this.imdbID + '&apikey=4a249f8d')
        .then(response => response.json())
        .then(res => this.pronadjenFilm = res.Search);
  }

}
