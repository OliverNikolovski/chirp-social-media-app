import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {AccessTokenResponse} from "../models/access-token-response";

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
        tap(accessTokenResponse => localStorage.setItem("accessToken", accessTokenResponse.access_token))
      );
  }

  // to do
  logout() {

  }

  // to do
  register() {

  }

  getAuthenticatedUser(): Observable<User> {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return this.http.get<User>(`${this.baseUrl}/authentication`, {headers});
  }

}
