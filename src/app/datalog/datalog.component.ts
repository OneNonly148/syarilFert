import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DbQueryService } from '../db-query.service';

export interface tData {
  Timestamp: number;
  Date: any;
  Time: string;
  tem: number;
  hum: number;
  ec: number;
  pH: number;
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
  displayedColumns: string[] = ['time', 'tem', 'hum', 'ec', 'pH'];

  constructor(private datalog: DbQueryService,) { }

  getTable(){
    console.log('Getting table');
    this.downReady = false;
    if(this.range.value.start && this.range.value.end){
      this.datalog.getDateTable(this.range.value.start, this.range.value.end);
      const sub2 = this.datalog.tableDate$.subscribe(value => {
        console.log(value);
        if(value.length>0){
          console.log(value);
          this.tableData=value;
          this.downReady = true;
        }
        setTimeout(() => {
          sub2.unsubscribe();
          this.downReady = true;
        }, 5000);
      });
    }else{
      console.log('Invalid date');
    }
  }

  getDownload(data: any){
    console.log('Downloading');
  }

  ngOnInit(): void {
    this.datalog.getTable();
    const sub1 = this.datalog.tableData$.subscribe(value => {
      this.tableData=value;
      setTimeout(() => {
        sub1.unsubscribe();
        this.downReady = true;
      }, 5000);
    });
  }

}
