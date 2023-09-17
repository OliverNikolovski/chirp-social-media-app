import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {PostsPaginationResponse} from "../responses/posts-pagination-response";
import {UserDetails} from "../models/user-details";
import {UserResponse} from "../responses/user.response";
import {User} from "../models/user";
import {FollowersResponse} from "../responses/followers.response";
import {FollowingResponse} from "../responses/following.response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8000/api/users';

  private readonly accessToken: string | null;
  private readonly httpHeaders: HttpHeaders;


  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.accessToken = this.authService.getAccessToken();

    if (!this.accessToken)
      throw Error("Unauthenticated");

    this.httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  getPostsForUser(id: number, page: number): Observable<PostsPaginationResponse> {
    return this.http.get<PostsPaginationResponse>(`${this.url}/${id}/posts?page=${page}`, {headers: this.httpHeaders});
  }

  getUserDetails(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.url}/${id}`, {headers: this.httpHeaders});
  }

  searchUsers(search: string): Observable<User[]> {
    if (!search.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.url}/search?search=${search}`, {headers: this.httpHeaders});
  }

  getFollowers(): Observable<FollowersResponse> {
    return this.http.get<FollowersResponse>(`${this.url}/followers`, {headers: this.httpHeaders});
  }

  getFollowing(): Observable<FollowingResponse> {
    return this.http.get<FollowingResponse>(`${this.url}/following`, {headers: this.httpHeaders});
  }
}
