import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface tData {
  time: number;
  temp: number;
  humd: number;
  irrd: number;
  power: number;
}

@Component({
  selector: 'app-datalog',
  templateUrl: './datalog.component.html',
  styleUrls: ['./datalog.component.css']
})
export class DatalogComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  downReady = false;
  tableData: Array<tData> = [];
  displayedColumns: string[] = ['time', 'temp', 'humd', 'irrd', 'power'];

  constructor() { }

  getTable(){
    console.log('Getting table');
  }

  getDownload(data: any){
    console.log('Downloading');
  }

  ngOnInit(): void {
  }

}
