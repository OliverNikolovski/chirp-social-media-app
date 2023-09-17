import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "../models/post";
import {AuthenticationService} from "./authentication.service";
import {MessageResponse} from "../responses/message.response";
import {IsFollowingResponse} from "../responses/is-following.response";
import {FollowResponse} from "../responses/follow.response";

@Injectable({
  providedIn: 'root'
})
export class FollowUnfollowService {

  private baseUrl = 'http://localhost:8000/api/follow';
  private readonly accessToken: string | null;
  private readonly httpHeaders: HttpHeaders;

  postCreated$ = new Subject<Post>();

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

  follow(followed_id: number): Observable<FollowResponse> {
    return this.http.post<any>(`${this.baseUrl}`, {followed_id}, {headers: this.httpHeaders});
  }

  unfollow(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.baseUrl}/${id}`, {headers: this.httpHeaders});
  }

  checkFollow(followerId: number, followedId: number): Observable<IsFollowingResponse> {
    return this.http.get<IsFollowingResponse>(`${this.baseUrl}/check/${followerId}/${followedId}`, {headers: this.httpHeaders});
  }

}
