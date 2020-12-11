import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AngularFireAuth,private router : Router) {
  }
  logout() {
    this.auth.signOut();
    console.log('logout');
  }
  setting(){
    console.log('helo');
    this.router.navigate(['setting']);
  }
}
