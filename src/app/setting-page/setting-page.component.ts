import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) { }

  buttonEdit(content:any, btnNum:number) {
    this.btnNumber = btnNum;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.buttonName);
      switch(this.btnNumber){
        case 1:
          this.btnName1 = this.buttonName;
          break;
        case 2:
          this.btnName2 = this.buttonName;
          break;
        case 3:
          this.btnName3 = this.buttonName;
          break;
        case 4:
          this.btnName4 = this.buttonName;
          break;
        case 5:
          this.btnName5 = this.buttonName;
          break;
        case 6:
          this.btnName6 = this.buttonName;
          break;
        case 7:
          this.btnName7 = this.buttonName;
          break;
        case 8:
          this.btnName8 = this.buttonName;
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
  }
}
