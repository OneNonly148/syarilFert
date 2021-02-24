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
  temperature=0;
  humidity= 0;
  btnStat1=false;
  btnStat2=false;
  btnStat3=false;
  btnStat4=false;
  btnStat5=false;
  btnStat6=false;
  btnStat7=false;
  btnStat8=false;
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
      this.btnStat2=this.btn[1];
      this.btnStat3=this.btn[2];
      this.btnStat4=this.btn[3];
      this.btnStat5=this.btn[4];
      this.btnStat6=this.btn[5];
      this.btnStat7=this.btn[6];
      this.btnStat8=this.btn[7];
    })

  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  buttonP(btn:number) {
    console.log(btn);
    switch(btn){
      case 1:
        if(this.btnStat1){
          console.log('1 off');
          this.btnStat1 = !this.btnStat1;
        }else{
          console.log('1 on');
          this.btnStat1 = !this.btnStat1;
        }
        firebase.database().ref('/fertigation/btn').update({ d1: this.btnStat1 });
        break;
      case 2:
        if(this.btnStat2){
          console.log('2 off');
          this.btnStat2 = !this.btnStat2;
        }else{
          console.log('2 on');
          this.btnStat2 = !this.btnStat2;
        }
        firebase.database().ref('/fertigation/btn').update({ d2: this.btnStat2 });
        break;
      case 3:
        if(this.btnStat3){
          console.log('3 off');
          this.btnStat3 = !this.btnStat3;
        }else{
          console.log('3 on');
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
      case 5:
        if(this.btnStat5){
          console.log('off');
          this.btnStat5 = !this.btnStat5;
        }else{
          console.log('on');
          this.btnStat5 = !this.btnStat5;
        }
        firebase.database().ref('/fertigation/btn').update({ d5: this.btnStat5 });
        break;
      case 6:
        if(this.btnStat6){
          console.log('off');
          this.btnStat6 = !this.btnStat6;
        }else{
          console.log('on');
          this.btnStat6 = !this.btnStat6;
        }
        firebase.database().ref('/fertigation/btn').update({ d6: this.btnStat6 });
        break;
      case 7:
          if(this.btnStat7){
            console.log('off');
            this.btnStat7 = !this.btnStat7;
          }else{
            console.log('on');
            this.btnStat7 = !this.btnStat7;
          }
          firebase.database().ref('/fertigation/btn').update({ d7: this.btnStat7 });
          break;
      case 8:
        if(this.btnStat8){
          console.log('off');
          this.btnStat8 = !this.btnStat8;
        }else{
          console.log('on');
          this.btnStat8 = !this.btnStat8;
        }
        firebase.database().ref('/fertigation/btn').update({ d8: this.btnStat8 });
        break;
    }
  }
  ngOnInit(): void {

  }

}
