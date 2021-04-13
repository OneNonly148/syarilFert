import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  closeResult = '';
  dispANumber:number = 0;
  dispBNumber:number = 0;
  dispStat = false;
  datas: Observable<any>;
  data:any = [];
  btns: Observable<any>;
  btn:any = [];
  constructor(public auth: AngularFireAuth, db: AngularFireDatabase, private router : Router,private modalService: NgbModal,) {
    this.datas = db.list('/fertigation/location').valueChanges();
    this.datas.forEach(x => {
      this.data = x;
      console.log(x)
    })
    this.btns = db.list('/fertigation/btn').valueChanges();
    this.btns.forEach(x => {
      this.btn = x;
      console.log(x);
      this.dispStat=this.btn[8];
    })
  }

  disbDisp(){//Disabling auto dispense
    firebase.database().ref('/fertigation/btn').update({ d9: false, d91: 0, d92: 0 });
    this.dispStat = false;
  }

  autoDisp(content:any){//Enable auto dispense
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      this.dispStat = true;
      console.log(this.closeResult + ' ' + this.dispANumber + ' ' + this.dispBNumber);
      if(this.closeResult === 'Save click'){
        console.log('Saving data');
        firebase.database().ref('/fertigation/btn').update({ d9: true, d91: this.dispANumber, d92: this.dispBNumber });
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
