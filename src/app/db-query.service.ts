import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { NumberLiteralType } from 'typescript';

export interface tData {
  Timestamp: number;
  Date: any;
  Time: string;
  ec: number;
  pH: number;
  tem: number;
  hum:number;
}

@Injectable({
  providedIn: 'root'
})

export class DbQueryService {
  tableData:any;
  private tableDatas: Subject<any> = new Subject<any>();
  tableData$ = this.tableDatas.asObservable();
  tableDate:any;
  private tableDates: Subject<any> = new Subject<any>();
  tableDate$ = this.tableDates.asObservable();
  tableExp: Array<tData> = [];
  tableDated: Array<any> = [];

  constructor(private db: AngularFireDatabase) {}

  getTable(): any{
    this.tableData = this.db.list('/fertigation/data', ref => ref.limitToLast(1440)).valueChanges();
    const nowDate = new Date();
    this.tableExp=[];
    this.tableData.forEach((x:any) => {
      x.forEach((y:any) =>{
        const date = new Date(y.time);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const timestamper =  y.time;
        if((minute==30 || minute==0)){
          const dated = String(date.getDate()) + '-' + String(date.getMonth()+1) + '-' + String(date.getFullYear());
          const time = String(hour) + ':' + String(minute);
          this.tableExp.push({Timestamp: y.time, Date: dated, Time: time, ec: y.ec, pH: y.pH, tem: y.temp, hum: y.hum});
        }
      });
      this.tableDatas.next(this.tableExp);
    });
  }

  getDateTable(start:Date, end:Date): any{
    console.log(start.getTime());
    console.log(end.getTime());
    this.tableDated=[];
    var endTime = end.getTime()+86400000;
    this.tableDate = this.db.list('/fertigation/data', ref =>
      ref.orderByChild('time').startAt(start.getTime()).endAt(endTime)
    ).snapshotChanges();
    this.tableDate.forEach((x:any) => {
      x.forEach((y:any) => {
        const date = new Date(y.payload.val().time);
        const hour = date.getHours();
        const minute = date.getMinutes();
        if(minute==30 || minute==0){
          const dated = String(date.getDate()) + '-' + String(date.getMonth()+1) + '-' + String(date.getFullYear());
          const time = String(hour) + ':' + String(minute);
          this.tableDated.push({Timestamp: y.payload.val().time, Date: dated, Time: time, tem: y.payload.val().tem, hum: y.payload.val().hum, pH: y.payload().pH, ec: y.payload().ec});
        }
      });
      this.tableDates.next(this.tableDated);
    });
  }
}
