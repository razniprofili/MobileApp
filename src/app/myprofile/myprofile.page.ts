import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
imePrezime: string;
  constructor(private router: Router, public service: UserService) { }

  ngOnInit() {
    this.imePrezime = this.service.getUserMail();
  }

  otvoriStranuZaIzmenu() {
    this.router.navigateByUrl('/myprofile/editprofile');
  }


}
