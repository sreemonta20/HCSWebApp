import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';
import {
  User,
  SpecificUser,
  LoginUserRequest,
  SaveUpdateRequest,
  DataResponse,
} from 'src/app/shared/interface/user.interface';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SessionStorageService } from 'src/app/shared/service/session.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss'],
})
export class UsermanagementComponent implements OnInit {
  isLoading = false;
  disabled = true;
  dataSaved = false;
  userForm: any;
  allUsers: Observable<User[]>;
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  saveUpdateUserRequest = new SaveUpdateRequest();
  userIdUpdate = null;
  massage = null;
  totalRows = 0;
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  error_message: string = '';
  SelectedDate = null;
  isUser = true;
  isAdmin = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['Id', 'FullName', 'UserName', 'Email', 'UserRole', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formbulider: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private sessionService: SessionStorageService,
    private notifyService: NotificationService
  ) {
    // this.userService.getAllUsers().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
    debugger;
    this.loadListOfData();
  }

  ngOnInit() {
    this.userForm = this.formbulider.group({
      Id: [''],
      FullName: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      UserRole: ['', [Validators.required]],
    });
  }

  loadListOfData() {
    debugger;
    this.isLoading = true;
    this.userService.getAllUsers(this.currentPage, this.pageSize).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          debugger;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(response.Result.Items);
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.Result.Count;
          });
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

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadListOfData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllUsersAfterEventOpt() {
    debugger;
    this.userService.getAllUsers(1, 5).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          this.dataSource = new MatTableDataSource(response.Result.Items);
          setTimeout(() => {
            this.paginator.pageIndex = 1;
            this.paginator.length = response.Result.Count;
          });
        } else {
          return;
        }
      },
      error: error => {
        this.error_message = error.error;
      },
    });
  }
  onFormSubmit() {
    debugger;
    this.isLoading = true;
    this.dataSaved = false;
    const user = this.userForm.value;
    this.saveUpdateUsers(user);
    this.userForm.reset();
  }

  saveUpdateUsers(user: User) {
    debugger;
    this.saveUpdateUserRequest.ActionName = this.userIdUpdate == null ? 'Save' : 'Update';
    this.saveUpdateUserRequest.Id = this.userIdUpdate == null ? '' : user.Id;
    this.saveUpdateUserRequest.FullName = user.FullName;
    this.saveUpdateUserRequest.UserName = user.UserName;
    this.saveUpdateUserRequest.Password = this.userIdUpdate == null ? user.Password : '';
    this.saveUpdateUserRequest.Email = user.Email;
    this.saveUpdateUserRequest.UserRole = user.UserRole;

    this.userService.registerUser(this.saveUpdateUserRequest).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          this.dataSaved = true;
          this.savedSuccessful(1);
          this.loadAllUsersAfterEventOpt();
          this.userIdUpdate = null;
          this.userForm.reset();
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

  loadUserToEdit(id: string) {
    debugger;
    this.isLoading = true;
    this.userService.getUserById(id).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          this.massage = null;
          this.dataSaved = false;
          this.userIdUpdate = response.Result.Id;
          this.userForm.controls['Id'].setValue(this.userIdUpdate);
          this.userForm.controls['FullName'].setValue(response.Result.FullName);
          this.userForm.controls['UserName'].setValue(response.Result.UserName);
          this.userForm.controls['Password'].setValue(response.Result.Password);
          this.userForm.controls['Email'].setValue(response.Result.Email);
          this.userForm.controls['UserRole'].setValue(response.Result.UserRole);
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

  deleteUser(id: string) {
    debugger;
    this.isLoading = true;
    this.userService.deleteUser(id).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          this.dataSaved = true;
          this.savedSuccessful(2);
          this.loadAllUsersAfterEventOpt();
          this.userIdUpdate = null;
          this.userForm.reset();
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

  resetForm() {
    this.userForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllUsersAfterEventOpt();
  }

  savedSuccessful(isUpdate: number) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
