import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RecAPPt';
  faUser = faUser;
  mustFlipCow: boolean = false;

  ngOnInit(): void {
    this.mustFlipCow = !!Math.round(Math.random());
  }
}
