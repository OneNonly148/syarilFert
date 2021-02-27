import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  closeResult = '';
  btnNumber:number = 0;
  buttonName: string = '';
  btnName1: string = "Dispenser 1";
  btnName2: string = "Dispenser 2";
  btnName3: string = "Dispenser 3";
  btnName4: string = "Dispenser 4";
  btnName5: string = "Dispenser 5";
  btnName6: string = "Dispenser 6";
  btnName7: string = "Dispenser 7";
  btnName8: string = "Dispenser 8";

  constructor(private modalService: NgbModal, db: AngularFireDatabase) { }

  buttonEdit(content:any, btnNum:number) {
    this.btnNumber = btnNum;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.buttonName);
      switch(this.btnNumber){
        case 1:
          this.btnName1 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn1: this.btnName1 });
          break;
        case 2:
          this.btnName2 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn2: this.btnName2 });
          break;
        case 3:
          this.btnName3 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn3: this.btnName3 }); 
          break;
        case 4:
          this.btnName4 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn4: this.btnName4 });  
          break;
        case 5:
          this.btnName5 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn5: this.btnName5 });    
          break;
        case 6:
          this.btnName6 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn6: this.btnName6 });
          break;
        case 7:
          this.btnName7 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn7: this.btnName7 }); 
          break;
        case 8:
          this.btnName8 = this.buttonName;
          firebase.database().ref('/fertigation/config').update({ btn8: this.btnName8 });
          break;
      };
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

  ngOnInit(): void {
    let btnNames = firebase.database().ref('/fertigation/config');
    btnNames.on('value', (snapshot) => {
      const data = snapshot.val();
      this.btnName1 = data.btn1;
      this.btnName2 = data.btn2;
      this.btnName3 = data.btn3;
      this.btnName4 = data.btn4;
      this.btnName5 = data.btn5;
      this.btnName6 = data.btn6;
      this.btnName7 = data.btn7;
      this.btnName8 = data.btn8;
    });
  }
}
