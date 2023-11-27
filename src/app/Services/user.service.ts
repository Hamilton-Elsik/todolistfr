import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import settings from 'src/assets/configuration/settings.json';
import { UserInsertDTO } from '../Models/user-insert-dto';
import { Observable } from 'rxjs';
import { ChangePasswordDTO } from '../Models/change-password-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myAppUrl: string;
  ApiUser: string;
  ApiChangePassword: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
    this.ApiUser = settings.General.Version + settings.APIS.ApiUser;
    this.ApiChangePassword =
      settings.General.Version + settings.APIS.ApiUserChgPwd;
  }
  saveUser(user: UserInsertDTO): Observable<any> {
    console.log(this.myAppUrl + this.ApiUser);
    return this.http.post(this.myAppUrl + this.ApiUser, user);
  }

  changePassword(changePassword: ChangePasswordDTO): Observable<any> {
    return this.http.put(
      this.myAppUrl + this.ApiChangePassword,
      changePassword
    );
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.ApiUser + id);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.myAppUrl + this.ApiUser + id);
  }
}
