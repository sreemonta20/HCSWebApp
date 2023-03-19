import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../service/session.service';

@Injectable()
export class CrudInterceptor implements HttpInterceptor {
  constructor(public sessionService: SessionStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      // const accessToken = JSON.parse(localStorage['loggedInUser']).access_token;
      const accessToken = JSON.parse(this.sessionService.get('loggedInUser')).access_token;
      return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }));
    } catch (err) {
      return next.handle(req);
    }
  }
}
