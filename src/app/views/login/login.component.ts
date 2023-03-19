import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import {
  User,
  SpecificUser,
  LoginUserRequest,
  SaveUpdateRequest,
  DataResponse,
} from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/user.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SessionStorageService } from 'src/app/shared/service/session.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  submitted = false;
  hide: boolean = true;
  error_message: string = '';
  isLoggedIn: boolean = false;

  loginModelRequest = new LoginUserRequest();

  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private sessionService: SessionStorageService,
    private notifyService: NotificationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.castLoggedIn.subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  signIn(): void {
    debugger;
    this.submitted = true;
    this.isLoading = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginModelRequest.UserName = this.loginForm.controls['userName'].value;
    this.loginModelRequest.Password = this.loginForm.controls['password'].value;
    this.userService.login(this.loginModelRequest).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          debugger;
          this.isLoading = false;
          this.isLoggedIn = true;
          this.sessionService.set('loggedInUser', JSON.stringify(response.Result));
          this.sessionService.set('isLoggedIn', JSON.stringify(this.isLoggedIn));

          this.sharedService.editIsLoggedIn(this.isLoggedIn);
          
          this.router.navigate(['/home']);
        } else {
          this.isLoading = false;
          this.notifyService.error(response.Message);
          return;
        }
      },
      error: error => {
        this.isLoading = false;
        this.error_message = error.error;
        this.notifyService.error(this.error_message);
        return;
      },
    });
  }
}
