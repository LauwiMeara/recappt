import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected title = 'RecAPPt';
  protected mustFlipCow: boolean = false;

  ngOnInit(): void {
    this.mustFlipCow = !!Math.round(Math.random());
  }
}
