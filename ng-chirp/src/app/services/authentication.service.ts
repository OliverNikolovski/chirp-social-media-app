import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {AccessTokenResponse} from "../models/access-token-response";
import {UserRegisterRequest} from "../requests/user-register.request";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
  };
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<AccessTokenResponse> {
    const loginRequest = {username, password};
    return this.http.post<AccessTokenResponse>(`${this.baseUrl}/login`, loginRequest, this.httpOptions)
      .pipe(
        tap(accessTokenResponse => this.saveAccessToken(accessTokenResponse))
      );
  }

  logout():Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {})
      .pipe(
        tap(_ => this.removeAccessToken())
      );
  }

  logoutFromAllDevices(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout-from-all-devices`, {})
      .pipe(
        tap(_ => this.removeAccessToken())
      );
  }

  register(request: UserRegisterRequest): Observable<AccessTokenResponse> {
    return this.http.post<AccessTokenResponse>(`${this.baseUrl}/register`, request, this.httpOptions)
      .pipe(
        tap(accessTokenResponse => this.saveAccessToken(accessTokenResponse))
      );
  }

  getAuthenticatedUser(): Observable<User> {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return this.http.get<User>(`${this.baseUrl}/authentication`, {headers});
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private saveAccessToken(accessTokenResponse: AccessTokenResponse): void {
    localStorage.setItem('accessToken', accessTokenResponse.access_token);
  }

  private removeAccessToken(): void {
    localStorage.removeItem('accessToken');
  }

}
