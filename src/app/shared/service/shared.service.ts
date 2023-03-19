import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  castLoggedIn = this.isLoggedIn.asObservable();

  editIsLoggedIn(newIsLoggedInValue: boolean) {
    this.isLoggedIn.next(newIsLoggedInValue);
  }
}
