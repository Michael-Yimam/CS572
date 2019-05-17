import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularExcerciseOne';
  inputValue;
  ComponentCounterValue = 0;
  numberUpdated(v) {
    this.inputValue = v;
  }
  counterChanged(v){
    this.ComponentCounterValue = v;
  }
}
