import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Router} from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeResult = '';
  dispNumber:number = 0;
  dispStat = false;
  constructor(public auth: AngularFireAuth,private router : Router,private modalService: NgbModal,) {
  }

  disbDisp(){
    this.dispStat = false;
  }

  autoDisp(content:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.dispStat = true;
      console.log(this.closeResult + ' ' + this.dispNumber);
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
}
