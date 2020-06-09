import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Movie} from '../movie.model';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {MoviesService} from '../movies.service';
import {UserService} from '../../user.service';
import {Subscription} from 'rxjs';

import { Chart } from 'chart.js';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
    @ViewChild('barChart', {static: true}) barChart;

  movies: Movie[];
  prazan = false;
  private moviesSub: Subscription;
  isLoading = false;
  userID: string = this.currentUser.getUserID();
  bars: any;
  itemZanr: any;
  itemSort: any;
  selectedZanr: string="";
  selectedSort: string="";

  filterData:any[];
  statistics: any[];
  recently:any[];
  chartdata:any[];


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


  constructor(private router: Router, private moviesService: MoviesService,
              private currentUser: UserService, private http: HttpClient) {}


  ionViewWillEnter() {
    console.log('izvrsen ion will enter');
    this.isLoading = true;
    this.moviesService.getMovies().subscribe(movieData => { //ovde sam uklonila userID jer nam nije potreban u potpisu metode
      this.isLoading = false;
      this.createBarChart();
      console.log(movieData);
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
      this.chartdata=this.izracunajPodatke(movies);
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
        if(this.selectedSort ==='desc') {
            this.filterData.sort((a,b)=> parseInt(b.ocena,10) - parseInt(a.ocena, 10));
        }
        if(this.selectedSort ==='asc'){
            this.filterData.sort((a,b)=> parseInt(a.ocena,10) - parseInt(b.ocena, 10));
        }
        console.log(this.selectedZanr);
        if(this.selectedZanr.trim()!='' && this.selectedZanr.trim() !='Svi žanrovi') {

                var novi: any[] = [];
                for (let i = 0; i < this.filterData.length; i++) {
                    if (this.filterData[i].zanr != undefined && this.filterData[i].zanr.trim() != ''
                        && this.filterData[i].zanr.trim().toLowerCase() === this.selectedZanr.toLowerCase()){
                        novi.push(this.filterData[i]);
                        console.log(this.filterData[i]);
                    }
                }
                console.log(novi);
                this.filterData = novi;

        }
  }

  izracunajPoslednje(movies: Movie[]):any[]{
      var last: any[]=[];
      this.recently=[];
      //poslednji pogledani
      //izdvajam ove koji imaju datum i od njih trazim max
      for(let i=0; i<movies.length; i++){
          if(movies[i].datum && movies[i].datum.trim() !='' ){
                last.push(movies[i]);
                console.log(movies[i]);
          }
      }
      var naziv='';
      if(last.length==1) naziv=last[0].naziv;
      if(last.length >1){
          //datum je string,mora da se promeni u Date
          var max=Date.parse(last[0].datum.trim());
          console.log(max);
          var index=0;
          var elem;
          for(let i=1; i<last.length; i++){
               elem= Date.parse(last[i].datum.trim());
               console.log(elem);
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
      //za svaki zanr broji koliko puta se pojavljuje u movies
      var novi: any[]=[];
      var brojac=0;
      for(let i=0; i<this.zanrovi.length;i++){
          brojac=0;
          for(let j=0; j<movies.length; j++) {
              if(movies[j].zanr!=undefined && movies[j].zanr.trim()!='' &&
              movies[j].zanr.trim().toLowerCase()== this.zanrovi[i].name.trim().toLowerCase()){
                  brojac++;
              }
          }
          novi.push({name:this.zanrovi[i].name.trim(), value:brojac});
          //console.log(this.zanrovi[i].name.trim()+" "+brojac);
      }
      var max=0;
      var naziv="";
      for(let i=0; i<novi.length; i++){
          if(novi[i].value> max){
              max=novi[i].value;
              naziv=novi[i].name;
              //console.log(max+" "+naziv);
          }

      }

      this.statistics.push({id:3, name:'Najgledaniji zanr', value:naziv});

      // for(let i=0; i<this.statistics.length;i++){
        //    console.log(this.statistics[i]);
        //}
        return this.statistics;
    }

  izracunajPodatke(movies: Movie[]):any[]{
      var godina= new Date().getFullYear();
      var pomocna=0;
       this.chartdata=[];

      for(let i=godina-9; i<=godina; i++){
        pomocna=0;
        for(let  j=0; j<movies.length; j++){
            if(movies[j].datum!=undefined && movies[j].datum.trim()!=''){
                var dat=parseInt(movies[j].datum.trim().split('-')[0], 10);
                if(dat==i) pomocna++;
            }
        }
        this.chartdata.push(pomocna);
    }
      console.log(this.chartdata);
      return this.chartdata;
  }

  createBarChart() {
      var godina= new Date().getFullYear();
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'bar',
            data: {
                labels: [godina-9, godina-8, godina-7, godina-6, godina-5, godina-4, godina-3, godina-2, godina-1, godina],
                datasets: [{
                    label: 'Broj filmova',
                    data: this.chartdata,
                    backgroundColor: 'rgb(247, 144, 10)',
                    borderColor: 'rgb(247 , 144, 10)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy');
        if(this.moviesSub){
            this.moviesSub.unsubscribe();
        }

    }

}
