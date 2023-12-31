import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, ReplaySubject, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserResponse} from "../responses/user.response";
import {AccessTokenResponse} from "../responses/access-token-response";
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

  public authentication$ = new ReplaySubject<UserResponse>(1);

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
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, {headers})
      .pipe(
        tap(_ => this.removeAccessToken())
      );
  }

  logoutFromAllDevices(): Observable<void> {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return this.http.post<void>(`${this.baseUrl}/logout-from-all-devices`, {}, {headers})
      .pipe(
        tap(_ => this.removeAccessToken())
      );
  }

  register(request: UserRegisterRequest): Observable<AccessTokenResponse> {
    const formData = new FormData();
    formData.set('username', request.username);
    formData.set('password', request.password);
    formData.set('password_confirmation', request.password_confirmation);
    formData.set('name', request.name);
    request.bio && formData.set('bio', request.bio);
    request.location && formData.set('location', request.location);
    request.website && formData.set('website', request.website);
    request.birthdate && formData.set('birthdate', request.birthdate.toISOString());
    request.profile_picture && formData.set('profile_picture', request.profile_picture);
    const headers = {
      'Accept': 'application/json'
    }
    return this.http.post<AccessTokenResponse>(`${this.baseUrl}/register`, formData, {headers});
  }

  fetchAuthenticatedUser(): Observable<UserResponse> {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return this.http.get<UserResponse>(`${this.baseUrl}/authentication`, {headers});
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
