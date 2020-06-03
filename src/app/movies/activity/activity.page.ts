import { Component, OnInit } from '@angular/core';
import {Movie} from '../movie.model';
import {Router} from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

import {MoviesService} from '../movies.service';
import {UserService} from '../../user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  movies: Movie[];
  prazan = false;
  private moviesSub: Subscription;
  isLoading = false;
  userID: string = this.currentUser.getUserID();

  itemZanr: any;
  itemSort: any;
  selectedZanr: string="";
  selectedSort: string="";

  filterData:any[];
  statistics: any[];
  recently:any[];

    zanrovi = [] = [
        { id: 0, name: 'Avantura', value: 'Avantura' },
        { id: 1, name: 'Akcioni', value: 'Akcioni'},
        { id: 2, name: 'Animacija', value: 'Animacija'},
        { id: 3, name: 'Biografski', value: 'Biografski' },
        { id: 4, name: 'Vestern', value:  'Vestern' },
        { id: 5, name: 'Dečiji', value: 'Dečiji'},
        { id: 6, name: 'Dokumentarni', value: 'Dokumentarni'},
        { id: 7, name: 'Drama', value: 'Drama' },
        { id: 8, name: 'Istorijski', value: 'Istorijski' },
        { id: 9, name: 'Komedija', value: 'Komedija'},
        { id: 10, name: 'Kartki', value: 'Kartki'},
        { id: 11, name: 'Kriminalistički', value: 'Kriminalistički' },
        { id: 12, name: 'Ljubavni', value: 'Ljubavni' },
        { id: 13, name: 'Misterija', value:  'Misterija'},
        { id: 14, name: 'Mjuzikl', value: 'Mjuzikl'},
        { id: 15, name: 'Muzički', value: 'Muzički' },
        { id: 16, name: 'Naučno-fantastični', value: 'Naučno-fantastični' },
        { id: 17, name: 'Porodični', value: 'Porodični'},
        { id: 18, name: 'Ratni', value: 'Ratni'},
        { id: 19, name: 'Sportski', value: 'Sportski' },
        { id: 20, name: 'Triler', value: 'Triler' },
        { id: 21, name: 'Fantastika', value: 'Fantastika'},
        { id: 22, name: 'Horor', value: 'Horor'},
        {id:  23, name:'Svi žanrovi', value:'Svi žanrovi'}
    ];

  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic Stock price'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'line';
  showLegend = false;

  // For search
  stock = '';


  constructor(private router: Router, private moviesService: MoviesService,
              private currentUser: UserService, private http: HttpClient) {}


  ionViewWillEnter() {
    console.log('izvrsen ion will enter');
    this.isLoading = true;
    this.moviesService.getMovies().subscribe(movieData => { //ovde sam uklonila userID jer nam nije potreban u potpisu metode
      this.isLoading = false;
      console.log(movieData);
     // this.movies = movieData;
      if ( this.movies.length === 0) {
          this.prazan=true;
      }
    });
  }


  ngOnInit() {
    console.log('ngOnInit');
    this.isLoading = true;
    this.moviesSub = this.moviesService.movies.subscribe((movies) => {
      this.isLoading = false;
      this.movies = movies;
      this.filterData = movies;
      this.recently=this.izracunajPoslednje(movies);
      this.statistics=this.izracunajStatistike(movies);
    });
  }

  onChangeZanr(event) {
      this.itemZanr = JSON.parse(JSON.stringify(event.detail));
      this.selectedZanr = this.itemZanr['value'];
      console.log(this.selectedZanr);
  }

  onChangeSort(event) {
    this.itemSort = JSON.parse(JSON.stringify(event.detail));
    this.selectedSort = this.itemSort['value'];
      console.log(this.selectedSort);

  }

  filtriraj(){
        this.filterData = this.movies;
        console.log(this.selectedSort);
        if(this.selectedSort ==='asc') {
            this.filterData.sort((a,b)=> parseInt(b.ocena,10) - parseInt(a.ocena, 10));
        }
        if(this.selectedSort ==='desc'){
            this.filterData.sort((a,b)=> parseInt(a.ocena,10) - parseInt(b.ocena, 10));
        }
        console.log(this.selectedZanr);
        if(this.selectedZanr && this.selectedZanr.trim()!='') {
            if(this.selectedZanr=='Svi žanrovi'){
                this.filterData=this.movies;
            }else{
                var novi: any[] = [];
                for (let i = 0; i < this.filterData.length; i++) {
                    if (this.filterData[i].zanr != undefined && this.filterData[i].zanr.trim() != ''
                        && this.filterData[i].zanr == this.selectedZanr.toLowerCase()){
                        novi.push(this.filterData[i]);
                        console.log(this.filterData[i]);
                    }
                }
                console.log(novi);
                this.filterData = novi;
            }
        }
  }

  izracunajPoslednje(movies: Movie[]):any[]{
      var last: any[]=[];
      this.recently=[];
      //poslednji pogledani
      //izdvajam ove koji imaju datum i od njih trazim max
      for(let i=0; i<movies.length; i++){
          if(movies[i].datum && movies[i].datum !='' ){
                last.push(movies[i]);
          }
      }
      var naziv='';
      if(last.length==1) naziv=last[0].naziv;
      if(last.length >1){
          //datum je string,mora da se promeni u Date
          var max=new Date(Date.parse(last[0].datum)).getUTCMilliseconds();
          var index=0;
          var elem;
          for(let i=1; i<last.length; i++){
               elem= new Date(Date.parse(last[i].datum)).getUTCMilliseconds();
              if(max<elem){
                  max=elem;
                  index=i;
              }
          }
          //console.log("Poslednji pogledani");
          //console.log(last[index].naziv);
          naziv=last[index].naziv;
      }
      this.recently.push({ id: 0, name: 'Poslednji film koji si pogledao/la:', value: naziv });
      last=[];

      //poslednji ocenjen ocenom 5
      for(let i=0; i<movies.length; i++){
          if(movies[i].ocena && movies[i].ocena ==5 ){
             // console.log(movies[i]);
              last.push(movies[i].naziv);
          }
      }
      //console.log(last[last.length-1]);
      this.recently.push({ id: 1, name: 'Poslednji film ocenjen ocenom 5:', value: last[last.length-1] });
     // console.log(this.recently[0].name+" "+this.recently[0].value);
      //console.log(this.recently[1].name+" "+this.recently[1].value);

      return  this.recently;
  }

  izracunajStatistike(movies: Movie[]):any[]{
      this.statistics=[];
      //ukupno filmova
        this.statistics.push({ id:0, name:'Ukupno filmova', value:movies.length});

        //ukupno vreme
        //default vreme filma je npr 100min
        var minuti=0;
        for(let i =0; i<movies.length; i++){
            if(movies[i].trajanje==undefined || movies[i].trajanje=='')
                minuti+=100;
            else minuti+= +movies[i].trajanje;
        }
        //console.log(minuti);
       
        this.statistics.push({id:1, name:'Ukupno minuta', value:minuti});

        //prosek ocena-nemaju svi ocenu
        var suma=0;
        var broj=0;
        for(let i=0; i<movies.length; i++){
            if(movies[i].ocena !=undefined){
                broj++;
                suma+= +movies[i].ocena;
            }
        }
        var sred=0;
        if(broj==0){
            sred=0;
        }else{
            sred=suma/broj;
        }
        this.statistics.push({id:2, name:'Prosek ocena', value:sred.toFixed(2)});

        //najgledaniji zanr
        var novi:[]=[];
        var brojac=0;
        for(let i=0; i<this.zanrovi.length; i++){
            brojac=0;

            for(let j=0; j<movies.length; j++){
                if(movies[j].zanr !=undefined &&
                    movies[j].zanr.toLowerCase()==this.zanrovi[i].value.toLowerCase()){
                    brojac++;
                }
            }
          // novi.push({id:i, name:this.zanrovi[i].name, value:brojac});
          // console.log({id:i, name:this.zanrovi[i].name, value:brojac});
        }
        var max=0;
        var vrednost="";
      //   for(let i=0; i<novi.length;i++){
      //     if(novi[i].value>max){
      //         max=novi[i].value;
      //         vrednost=novi[i].name;
      //     }
      // }
        this.statistics.push({id:3, name:"Najgledaniji zanr", value:vrednost});

       // for(let i=0; i<this.statistics.length;i++){
          //  console.log(this.statistics[i]);
        //}
        return this.statistics;
    }

    getData() {
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?from=2018-03-12&to=2019-03-12`).subscribe(res => {
      //const history = res;
      //  const history = res.historical;

      this.chartLabels = [];
      this.chartData[0].data = [];

      // for (const entry of history) {
      //   this.chartLabels.push(entry.date);
      //   this.chartData[0].data.push(entry.close);
      // }
    });
  }

  typeChanged(e) {
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }

}
