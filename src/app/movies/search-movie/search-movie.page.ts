import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {Movie} from '../movie.model';
import {Router} from '@angular/router';
import {MoviesService} from "../movies.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
})
export class SearchMoviePage implements OnInit {

  public queryText: string;
  movies: Movie[];
  prazan = false;


  constructor(private router: Router, private moviesService: MoviesService, private currentUser: UserService) {
    this.inicijalizuj();
  }

  // ovo su test podaci, radice se sa bazom posle
  inicijalizuj() {
    // this.movies  = [
    //   {
    //     id: '11',
    //     naziv: 'Juzni vetar',
    //     zanr: 'akcija',
    //     glumci: 'MIlos Bikovic,...',
    //     ocena: 5,
    //     datum: '22.11.2019.',
    //     komentar: 'Odlican film pogledaj drugi deo obavezno!!'
    //   },
    //   {
    //     id: '22',
    //     naziv: 'Neki film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 2,
    //     datum: '12.05.2019.',
    //     komentar: 'Neki tamo komentar'
    //   },
    //   {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   },
    //   {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }, {
    //     id: '3',
    //     naziv: 'Treci film',
    //     zanr: 'komedija',
    //     glumci: 'neki tamo glumci',
    //     ocena: 3,
    //     datum: '13.01.2019.',
    //     komentar: 'Neki tamo komentar'
    //   }
    //   ];
  }
  userID: string= this.currentUser.getUserID();
  ngOnInit() {
    this.moviesService.getMovies(this.userID).subscribe(quotesData=>{
      console.log(quotesData);
      const movies : Movie[] = [];
      for(const key in quotesData){
        if(quotesData.hasOwnProperty(key)){
          movies.push({
            id: key,
            naziv: quotesData[key].naziv,
            zanr: quotesData[key].zanr,
            ocena: quotesData[key].ocena,
            zemlja: quotesData[key].zemlja,
            komentar: quotesData[key].komentar,
            glumci: quotesData[key].glumci,
            reziser: quotesData[key].reziser,
            datum: quotesData[key].datum,
            trajanje: quotesData[key].trajanje
          })
        }


      }
      console.log(movies);
      this.movies = movies;
      if(this.movies.length === 0){
        this.prazan = true;
      }
    });

    // this.moviesService.addMovie(this.userID).subscribe(res =>{
    //   console.log(res);
    // })
  }

  updateMovies(ev: any) {
    this.inicijalizuj();
    const val = ev.target.value;
    // tslint:disable-next-line:triple-equals
    if (val && val.trim() != '') {
      this.movies = this.movies.filter((item) => {
        return (item.naziv.toLocaleLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
}

  otvoriStranuZaDodavanje() {
    this.router.navigateByUrl('/movies/tabs/add-movie');
  }

}
