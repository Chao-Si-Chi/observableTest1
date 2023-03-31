import { Component, VERSION, OnInit } from '@angular/core';
import { filter, first, fromEvent, map, Observable, scan, take, interval, merge, zip, of, race, forkJoin, retry, tap } from 'rxjs';
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

    //this.filteringFilter();
    //this.filteringFirst();
    //this.filteringTake();
    //this.filterTakeWithInterval();

    //this.combineMerge();
    //this.combineZip();
    //this.combineRace();
    //this.combineForkJoin();
    
    //this.othersRetry();
    //this.othersTap();

    //this.demoPromise();
    //this.demoPromiseRace();
    this.demoPromiseAll();
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

  filteringFirst(){
    of('Axxxxxx2', 'O126666664','A123456781').pipe(
      first()
    ).subscribe(
        v => console.log(`first value: ${v}`), 
        err => console.log(`Oops! there are some error!`) ,
        () => console.log('complete')
    );
  }

  filteringTake(){
    of(1,2,3,4,5,6,7,8).pipe(
      take(2)
    ).subscribe(
        v => console.log(`value: ${v}`), 
        err => console.log(`Oops! there are some error!`) ,
        () => console.log('complete')
    );
  }

  filterTakeWithInterval(){
    console.log('我數到 3');
    interval(1).pipe(
      map( x => x + 1),
      take(3)
    ).subscribe(
      v => console.log(`${v}..`), 
      err => console.log(`Oops! there are some error!`) ,
      () => console.log('好!回家!')
    );
  }

  combineMerge(){
    let timer1 = interval(1000).pipe(take(10), map( x=> 'timer1: ' + String(x)));
    let timer2 = interval(2000).pipe(take(6), map( x=> 'timer2: ' + String(x)));
    merge(timer1, timer2).subscribe(x => console.log(`output: ${x}`));
  }

  combineZip(){
    /*let age = of<number>(27, 25, 29, 33, 45);
    let name = of<string>('Foo', 'Bar', 'Beer', 'Da');
    let isDev = of<boolean>(true, true, false);
    
    zip(age, name, isDev).pipe(
      map(([age, name, isDev]) => ({ age, name, isDev })),
    ).subscribe(x => console.log(x));*/
  }

  combineRace(){
    let timer1 = interval(1000).pipe(take(10), map( x=> 'timer1: ' + String(x)));
    let timer2 = interval(2000).pipe(take(6), map( x=> 'timer2: ' + String(x)));
    
    race(timer1, timer2).subscribe(x => console.log(`output: ${x}`));
  }

  combineForkJoin(){
    forkJoin({
      foo: of(1, 2, 3, 4),
      bar: Promise.resolve(8),
      baz: interval(3000).pipe(take(2))
    }).subscribe({
      next: value => console.log(`forkJoin: ${JSON.stringify(value)}`),
      complete: () => console.log("complete!!")
    });
  }

  othersRetry(){
    // throw error 
    of('a', 'b', 'c', 2).pipe(
      map( (v:string) =>  v.toUpperCase()),
      //retry 2 times on error 
      retry(2)
    ).subscribe( 
        v => console.log(`first: ${v}..`),
        err => console.log(`first: Opps! There are some error: ${err}`),
        () => console.log("first: complete!")
      );

    // run complete
    of('a', 'b', 'c' ).pipe(
        map( (v:string) =>  v.toUpperCase()),
        //retry 2 times on error 
        retry(2)
      ).subscribe( 
          v => console.log(`second: ${v}..`),
          err => console.log(`second: Opps! There are some error: ${err}`),
          () => console.log("second: complete!")
        );
  }

  othersTap(){
    // record value in console.log
    of('a', 'b', 'c', 2).pipe(
      tap( v => console.log(`before: ${v}`)),
      map( (v:string) =>  v.toUpperCase()),
      tap( v => console.log(`after: ${v}`)),
    ).subscribe( 
        v => console.log(`${v}..`),
        err => console.log(`Opps! There are some error: ${err}`),
        () => console.log("complete!")
    );

    // modify value in tap
    of('a', 'b', 'c', 2).pipe(
      tap( v => {
        return 'x';
      }),
      map( (v:string) =>  v.toUpperCase()),
      tap( v => console.log(`modfiy: after: ${v}`)),
    ).subscribe( 
        v => console.log(`modify: ${v}..`),
        err => console.log(`modify: Opps! There are some error: ${err}`),
        () => console.log("modify: complete!")
    );
  }

  demoPromise(){
    let declaration = new Promise((resolve, reject) => {
      console.log('hello in Promise declaration')
      resolve('world');
    });

    setTimeout(
        ()=>declaration.then((v)=>console.log(`say: ${v} in then statement.`))
        , 5000
    );
  }

  demoPromiseRace(){
    var p1 = new Promise(function(resolve, reject) { 
      setTimeout(() => resolve('one') , 500)
    });
    var p2 = new Promise(function(resolve, reject) { 
      setTimeout(() => resolve('two') , 100); 
    });
  
    Promise.race([p1, p2]).then(function(value) {
      console.log(value); 
      // "two"
    });
  }

  demoPromiseAll(){
    var p1 = new Promise(function(resolve, reject) { 
      setTimeout(() => resolve('one') , 5000)
    });
    var p2 = new Promise(function(resolve, reject) { 
      setTimeout(() => resolve('two') , 1000); 
    });

    Promise.all([p1, p2]).then(function(value) {
      console.log(value); 
      // ['one', 'two']
    });
  }
}