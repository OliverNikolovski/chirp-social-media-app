import {Injectable} from "@angular/core";
import {map, Observable, ReplaySubject, switchMap} from "rxjs";
import {Authentication} from "../models/authentication";
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

  private subject = new ReplaySubject<Authentication>(1);
  accessChange$ = this.subject.asObservable();

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<Authentication> {
    const loginRequest = {username, password};
    return this.http.post<AccessTokenResponse>(`${this.baseUrl}/login`, loginRequest, this.httpOptions)
      .pipe(
        switchMap(({access_token}) =>
          this.getAuthenticatedUser(access_token)
            .pipe(
              map(user => {
                const authentication = ({access_token, user}) as Authentication;
                this.subject.next(authentication);
                return authentication;
              }),
            ))
      );
  }

  getAuthenticatedUser(token: string): Observable<User> {
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return this.http.get<User>(`${this.baseUrl}/authentication`, {headers});
  }

}
