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
    this.downReady = false;
    if(this.range.value.start && this.range.value.end){
      this.graphP.getDateTable(this.par.loc,this.range.value.start,this.range.value.end);
      const sub2 = this.graphP.tableDate$.subscribe(value => {
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
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  ngOnInit(): void {
  }

}
