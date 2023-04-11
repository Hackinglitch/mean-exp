import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let item of data$ | async">{{ item }}</div>
  `
})
export class AppComponent {
  data$: Observable<string[]>;

  constructor() {
    this.data$ = this.getData();
  }

  private getData(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      // Simulate an HTTP request that takes 3 seconds to complete.
      setTimeout(() => {
        observer.next(['item 1', 'item 2', 'item 3']);
      }, 1000);

      setTimeout(() => {
        observer.next(['item 4', 'item 5', 'item 6']);
      }, 2000);

      setTimeout(() => {
        observer.next(['item 7', 'item 8', 'item 9']);
      }, 3000);

      setTimeout(() => {
        observer.complete();
      }, 4000);
    });
  }
}
