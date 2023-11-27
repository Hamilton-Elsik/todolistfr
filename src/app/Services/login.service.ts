import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountDTO } from '../Models/account-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import settings from 'src/assets/configuration/settings.json';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  myAppUrl: string;
  ApiAccount: string;
  role!: string;
  userId: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
    this.ApiAccount = settings.General.Version + settings.APIS.ApiAccount;
  }
  login(usuario: AccountDTO): Observable<any> {
    return this.http.post(this.myAppUrl + this.ApiAccount, usuario);
  }

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    return decodedToken;
  }

  removeLocalStorage(): void {
    localStorage.removeItem('token');
  }
}
