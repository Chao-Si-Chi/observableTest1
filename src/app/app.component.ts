import { Component, VERSION, OnInit } from '@angular/core';
import { filter, fromEvent, map, Observable, of, scan } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  name = "Angular " + VERSION.major;

  ngOnInit() {
  }

  onClick(){
    //this.firstObservable();
    //this.customObservable();
    //this.createAjax();
    //this.createOf();
    //this.createFromEvent();

    //this.transformMap();
    //this.transformScan();

    //this.demoPipe();

    this.filteringFilter();
  }

  firstObservable(){
    new Observable(function(observer) {
      // ... some logic
      console.log('hello');
      // ... and set values into observer by invoke next
      observer.next(1);
      observer.next({ a1: "2020/7/13", b1: "XXXTTDF", c1: 1 });
      //observer.error('There are some error');
      //observer.complete();
      observer.next(2); // never run this;
      // return a object, include a unsubscribe method
      return {
        unsubscribe() {
          console.log("Good bye. Have a nice day ;)");
        }
      };
    });
  }

  customObservable(){
    let sheet = new Observable(function(observer) {
      // ... some logic
      console.log('hello');
      // ... and set values into observer by invoke next
      observer.next(1);
      observer.next({ a1: "2020/7/13", b1: "XXXTTDF", c1: 1 });
      observer.error('There are some error');
      observer.complete();
      observer.next(2); // never run this;
      // return a object, include a unsubscribe method
      return {
        unsubscribe() {
          console.log("Good bye. Have a nice day ;)");
        }
      };
    });

    let subscriptionA = sheet.subscribe({
      next(x) {
        console.log("A:", x);
      },
      error(x) {
        console.error("A:", x);
      },
      complete() {
        console.log("subscriptionA get complete");
      }
    });
  }

  createAjax(){
    ajax('https://5f0eb1f0faef3500160b87cb.mockapi.io/users/2').subscribe(res => 
      console.log(res.status, res.response));
  }

  createOf(){
    of(1, 2, "3x").subscribe(event => console.log(event));
  }

  createFromEvent(){
    fromEvent(document, 'click').subscribe(event => console.log(event));
  }

  transformMap(){
    // define logic within map function
    let demoMap = map((x:number) => x * x);
    // then put one observable as the parameter for the function
    let demoMapObservable = demoMap(of(1, 2, 3));
    // and you will get the result after invoke subscribe
    demoMapObservable.subscribe(v => console.log(`map value: ${v}`));
  }

  transformScan(){
    let demoScan = scan((acc: number, one: number) => acc + one, 0);
    let demoScanObversable = demoScan(of(1, 3, 5));
    demoScanObversable.subscribe(v => console.log(`scan acc value: ${v}`));
  }

  demoPipe(){
    of(1,3,5).pipe(
      map((x:number) => x * x),
      scan((acc: number, one: number) => acc + one, 0)
    ).subscribe( v=>console.log(`after pip value: ${v}`));
  }

  filteringFilter(){
    of('Axxxxxx2', 'O126666664','A123456789').pipe(
      filter(x => (/^[A-Z]\d{8}[^1,2,6]/g).test(x))
    ).subscribe(v => console.log(`pass regex: ${v}`));
  }
}