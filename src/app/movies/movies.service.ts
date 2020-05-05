import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from './movie.model';
interface MovieData{
  id: string;
  naziv: string;
  zanr: string;
  glumci: string;
  ocena: number;
  datum: string;
  komentar: string;
  reziser: string;
  trajanje: number;
  zemlja: string;
}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _movies: Movie[] = [];
  movieData: Movie;
  constructor(private http: HttpClient) { }

  get movies(): Movie[]{
    return this._movies;
  }

  getMovies( userID: string){
    return this.http
        .get<{ [key: string]: MovieData }>(
            `https://moviemobileapp-b3eae.firebaseio.com/users/` + userID + `/mojiFilmovi.json`
        );
  }

  //test rute POST zahteva sa nekiim bzvz podacima
  // addMovie(userID: string){
  //   return this.http
  //       .post<{ name: string }>(
  //           `https://moviemobileapp-b3eae.firebaseio.com/users/` + userID + `/mojiFilmovi.json`,//radi ruta!
  //           { author: "test", text: "test text" }
  //       );
  // }
}
