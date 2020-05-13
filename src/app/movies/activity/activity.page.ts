import { Component, OnInit } from '@angular/core';
import {Movie} from '../movie.model';
import {Router} from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  movies: Movie[];


  items = [] = [
    { id: 0, name: 'Ukupno filmova', value: 24 },
    { id: 1, name: 'Ukupno vreme', value: 150},
    { id: 2, name: 'Prosek ocena', value: 3.4},
    { id: 3, name: 'Najgledaniji žanr', value: 'komedija' }
  ];

  recently = [] = [
    { id: 0, name: 'Poslednji film koji si pogledao/la:', value: 'Realna prica' },
    { id: 1, name: 'Poslednji film ocenjen ocenom 5:', value: 'Juzni vetar'}
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


  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {}

  getData() {
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?from=2018-03-12&to=2019-03-12`).subscribe(res => {
      const history = res['historical'];

      this.chartLabels = [];
      this.chartData[0].data = [];

      for (let entry of history) {
        this.chartLabels.push(entry.date);
        this.chartData[0].data.push(entry['close']);
      }
    });
  }

  typeChanged(e) {
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }

}
