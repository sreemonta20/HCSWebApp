import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SessionStorageService } from 'src/app/shared/service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private sharedService: SharedService,
    private sessionService: SessionStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.castLoggedIn.subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  signOut(): void {
    // localStorage['loggedInUser'] = undefined;
    this.sessionService.remove('loggedInUser');
    this.sessionService.remove('isLoggedIn');
    this.sharedService.editIsLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
