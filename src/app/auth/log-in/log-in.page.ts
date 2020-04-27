import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLogIn(form: NgForm){
    //console.log(form);
    if(form.valid){
      this.authService.login(); //da se upamti da smo ulogovani
      this.router.navigateByUrl('/movies'); // kada se ulogujemo idemo na ovu stranicu
    }
  }

}
