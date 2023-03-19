import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { User, SpecificUser, LoginUserRequest, SaveUpdateRequest, DataResponse } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserByIdUrl: string = `${url}/api/User/getUserbyId`;
  getAllUsersUrl: string = `${url}/api/User/getAllUsers`;
  userLoginUrl: string = `${url}/api/User/login`;
  registerUserUrl: string = `${url}/api/User/registerUser`;
  deleteUserUrl: string = `${url}/api/User/deleteUser`;

  constructor(private http: HttpClient) {}

  getUserById(id:string): Observable<DataResponse> {
    const params = new HttpParams().set('id', id);
    return this.http.get<DataResponse>(this.getUserByIdUrl,{params})
  }

  getAllUsers(pageNumber:number, pageSize: number): Observable<DataResponse> {
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get<DataResponse>(this.getAllUsersUrl,{params})
  }

  login(user: LoginUserRequest): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.userLoginUrl, user);
  }

  registerUser(user: SaveUpdateRequest): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.registerUserUrl, user);
  }

  deleteUser(id:string): Observable<DataResponse> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<DataResponse>(this.deleteUserUrl,{params})
  }
}
