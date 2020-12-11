import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  title = 'Fertigation IoT';
  temperature=333;
  humidity= 22;
  selection = {
    value : '',
  };
  constructor(public auth: AngularFireAuth,private router : Router) {
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
    console.log('logout');
  }
  setting(){
    console.log('helo');
    this.router.navigate(['setting']);
  }
  ngOnInit(): void {
  }

}
