import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {Movie} from '../movie.model';
import {Router} from '@angular/router';
import {MoviesService} from "../movies.service";
import {UserService} from "../../user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
})
export class SearchMoviePage implements OnInit, OnDestroy {

  public queryText: string;
  index = 0;
  movies: Movie[];
  prazan = false;
  private moviesSub: Subscription;
  isLoading = false;
  constructor(private router: Router, private moviesService: MoviesService, private currentUser: UserService) {

  }

  inicijalizuj() {
    this.moviesService.movies.subscribe((movies) => {
      this.movies = movies;
    });

  }

  userID: string= this.currentUser.getUserID();

  ngOnInit() {
    console.log('ngOnInit');
    this.isLoading = true;
    this.moviesSub = this.moviesService.movies.subscribe((movies) => {
      this.isLoading = false;
      this.movies = movies;
    });
  }

  ionViewWillEnter(){
    console.log('izvrsen ion will enter')
    this.isLoading = true;
    this.moviesService.getMovies().subscribe(movieData =>{
      this.isLoading = false;
      console.log(movieData);

    //  this.movies = movies;
      if(this.movies.length === 0){
        this.prazan = true;
      } else {
        this.prazan = false;
      }
    });
  }


  pretraga(ev: any) {
    this.inicijalizuj();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.movies = this.movies.filter((item) => {
        return (item.naziv.toLocaleLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
}

  otvoriStranuZaDodavanje() {
    this.router.navigateByUrl('/movies/tabs/add-movie');
  }

  //kad se unisti stranica unisti se i subscribcija
  // sa svih subrscribe se odjavljujemo
  // kada se odjavimo pozvace se
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if(this.moviesSub){
      this.moviesSub.unsubscribe();
    }

  }

}
