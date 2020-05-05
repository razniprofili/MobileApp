import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from './movie.model';
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
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
  private _movies = new BehaviorSubject<Movie[]>([]);
  movieData: Movie;
  constructor(private http: HttpClient) { }

  get movies(){
    return this._movies.asObservable();
  }

  getMovies( userID: string){
    return this.http
        .get<{ [key: string]: MovieData }>(
            `https://moviemobileapp-b3eae.firebaseio.com/users/` + userID + `/mojiFilmovi.json`
        ).pipe(map(movieData =>{
          console.log(movieData);
          const movies : Movie[] = [];
          for(const key in movieData){
            if(movieData.hasOwnProperty(key)){
              movies.push({
                id: key,
                naziv: movieData[key].naziv,
                zanr: movieData[key].zanr,
                ocena: movieData[key].ocena,
                zemlja: movieData[key].zemlja,
                komentar: movieData[key].komentar,
                glumci: movieData[key].glumci,
                reziser: movieData[key].reziser,
                datum: movieData[key].datum,
                trajanje: movieData[key].trajanje
              });
            }
          }
          this._movies.next(movies);
          return movies;
        }));
  }
  // .pipe(
  //         map((quotesData) => {
  //           console.log(quotesData);
  //           const quotes: Quote[] = [];
  //           for (const key in quotesData) {
  //             if (quotesData.hasOwnProperty(key)) {
  //               quotes.push({
  //                 id: key,
  //                 author: quotesData[key].author,
  //                 text: quotesData[key].text,
  //                 imageUrl:
  //                   "https://ideas.staticsfly.com/ideas/wp-content/uploads/2016/04/graduation-quote_college_nora-ephron.jpg",
  //               });
  //             }
  //           }
  //
  //           this._quotes.next(quotes);
  //           return quotes;
  //         })
  // primer koriscenja REST API-ja cloud database-a :)
// https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/cities/LA

  //test rute POST zahteva sa nekiim bzvz podacima
  // addMovie(userID: string){
  //   return this.http
  //       .post<{ name: string }>(
  //           `https://moviemobileapp-b3eae.firebaseio.com/users/` + userID + `/mojiFilmovi.json`,//radi ruta!
  //           { author: "test", text: "test text" }
  //       );
  // }
}
