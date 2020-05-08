import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {Movie} from '../movie.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
})
export class SearchMoviePage implements OnInit {

  public queryText: string;
  movies: Movie[];


  constructor(private router: Router) {
    this.inicijalizuj();
  }

  // ovo su test podaci, radice se sa bazom posle
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
