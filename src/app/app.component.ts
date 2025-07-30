import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected title = 'RecAPPt';
  protected mustFlipCow: boolean = false;

  public ngOnInit(): void {
    this.mustFlipCow = !!Math.round(Math.random());
  }
}
