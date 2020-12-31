import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  title = 'Fertigation IoT';
  datas: Observable<any>;
  data:any = [];
  btns: Observable<any>;
  btn:any = [];
  temperature=333;
  humidity= 22;
  btnStat1=false;
  btnStat2=false;
  btnStat3=false;
  btnStat4=false;
  selection = {
    value : '',
  };
  constructor(public auth: AngularFireAuth,db: AngularFireDatabase,private router : Router) {
    
    this.datas = db.list('/fertigation/location').valueChanges();
    this.datas.forEach(x => {
      this.data = x;
      console.log(x)
    })
    this.btns = db.list('/fertigation/btn').valueChanges();
    this.btns.forEach(x => {
      this.btn = x;
      console.log(x);
      this.btnStat1=this.btn[0];
    console.log(this.btnStat1);
    })      
    
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  buttonP(btn:number) {
    console.log(btn);
    
    switch(btn){
      case 1:
        if(this.btnStat1 ){
          console.log('off');
          this.btnStat1 = !this.btnStat1; 
          
        }else{
          console.log('on');
          this.btnStat1 = !this.btnStat1; 
        }
        firebase.database().ref('/fertigation/btn').update({ d1: this.btnStat1 });
        break;
      case 2:
        if(this.btnStat2){
          console.log('off');
          this.btnStat2 = !this.btnStat2; 
        }else{
          console.log('on');
          this.btnStat2 = !this.btnStat2; 
        }
        firebase.database().ref('/fertigation/btn').update({ d2: this.btnStat2 });
        break;
      case 3:
        if(this.btnStat3){
          console.log('off');
          this.btnStat3 = !this.btnStat3; 
        }else{
          console.log('on');
          this.btnStat3 = !this.btnStat3; 
        }
        firebase.database().ref('/fertigation/btn').update({ d3: this.btnStat3 });
        break;
        case 4:
          if(this.btnStat4){
            console.log('off');
            this.btnStat4 = !this.btnStat4; 
          }else{
            console.log('on');
            this.btnStat4 = !this.btnStat4; 
          }
          firebase.database().ref('/fertigation/btn').update({ d4: this.btnStat4 });
          break;
    }
  }
  ngOnInit(): void {

  }

}
