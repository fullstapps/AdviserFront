import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILogin,
  IProfile,
  ISignup,
  ITokenResponse,
} from '../core/models/auth.models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(data: ILogin): Observable<ITokenResponse> {
    return this._http.post<ITokenResponse>('auth/login', data);
  }
  signUp(data: ISignup) {
    return this._http.post('auth/signup', data);
  }
  getProfile(): Observable<IProfile> {
    return this._http.get<IProfile>('auth/profile');
  }
  updateProfile(data: IProfile): Observable<IProfile> {
    return this._http.put<IProfile>('auth/profile', data);
  }
}
