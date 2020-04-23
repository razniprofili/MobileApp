import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../movie.model";

@Component({
  selector: 'app-movie-element',
  templateUrl: './movie-element.component.html',
  styleUrls: ['./movie-element.component.scss'],
})
export class MovieElementComponent implements OnInit {

  @Input() movie: Movie={id:'11', naziv: 'Juzni vetar', zanr:"akcija", glumci:"MIlos Bikovic,...", ocena:5, datum:"22.11.2019.", komentar:"Odlican film pogledaj drugi deo obavezno!!"};

  constructor() { }

  ngOnInit() {}

}
