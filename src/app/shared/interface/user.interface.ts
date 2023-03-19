// export interface User {
//   Id: string;
//   FullName: string;
//   UserName: string;
//   Email: string;
//   UserRole: string;
// }
export class User {
  Id: string;
  FullName: string;
  UserName: string;
  Password:  string;
  Email: string;
  UserRole: string;
}

// export interface SpecificUser{
//   Id:  string;
//   FullName:  string;
//   UserName:  string;
//   Password:  string;
//   SaltKey:  string;
//   Email:  string;
//   UserRole:  string;
//   LastLoginAttemptAt:  Date;
//   LoginFailedAttemptsCount:  number;
//   CreatedBy:  string;
//   CreatedDate:  Date;
// }

export class SpecificUser {
  Id:  string;
  FullName:  string;
  UserName:  string;
  Password:  string;
  SaltKey:  string;
  Email:  string;
  UserRole:  string;
  LastLoginAttemptAt:  Date;
  LoginFailedAttemptsCount:  number;
  CreatedBy:  string;
  CreatedDate:  Date;
}

// export interface LoginUserRequest {
//   UserName: string;
//   Password: string;
// }
export class LoginUserRequest {
  UserName: string;
  Password: string;
}

// export interface SaveUpdateRequest {
//   ActionName: string;
//   Id: string;
//   FullName: string;
//   UserName: string;
//   Password: string;
//   Email: string;
//   UserRole: string;
// }

export class SaveUpdateRequest {
  ActionName: string;
  Id: string;
  FullName: string;
  UserName: string;
  Password: string;
  Email: string;
  UserRole: string;
}

// export interface DataResponse {
//   Success: boolean;
//   Message: string;
//   MessageType: number;
//   ResponseCode: number;
//   Result: any;
// }

export class DataResponse {
  Success: boolean;
  Message: string;
  MessageType: number;
  ResponseCode: number;
  Result: any;
}




