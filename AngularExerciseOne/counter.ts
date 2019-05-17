import {Component, Input, SimpleChanges, ViewEncapsulation,
  OnChanges, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-counter',
  template: `<button (click)="decrement()"> - </button>
              <span>  {{counterValue}}   </span>
             <button (click)="increment()"> + </button>`,
  styles: ['button { background-color: navy; color: white; width: 60px; height: 30px; border: 0; border-radius: 4px;}']
})

export class CounterComponent implements OnChanges{
  @Input() counter;
  @Output() counterChange = new EventEmitter();
  counterValue = 0;


  ngOnChanges(changes: SimpleChanges) {
    this.counterValue = changes.counter.currentValue === undefined ? 0 :
      (changes.counter.currentValue === '' ? 0 : changes.counter.currentValue);
  }
  increment() {
    ++this.counterValue;
    this.counterChange.emit(this.counterValue);
  }
  decrement() {
    --this.counterValue;
    this.counterChange.emit(this.counterValue);

  }
}
