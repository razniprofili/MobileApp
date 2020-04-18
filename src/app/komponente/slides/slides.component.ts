import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    // breakpoints: {
    //   // when window width is >= 320px
    //   320: {
    //     slidesPerView: 2,
    //     spaceBetween: 20
    //   },
    //   // when window width is >= 480px
    //   480: {
    //     slidesPerView: 3,
    //     spaceBetween: 30
    //   },
    //   // when window width is >= 640px
    //   640: {
    //     slidesPerView: 4,
    //     spaceBetween: 40
    //   }
    // }
  };
  constructor() { }

  ngOnInit() {}

}
