import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //localStorage['isLoggedIn'] = JSON.stringify(false);
  title = 'angular-crud';
}
