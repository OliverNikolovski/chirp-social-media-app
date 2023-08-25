import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Post} from "../models/post";
import {AuthenticationService} from "./authentication.service";
import {LikeResponse} from "../responses/like.response";
import {LikeRequest} from "../requests/like.request";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = 'http://localhost:8000/api/likes';
  private readonly accessToken: string | null;
  private readonly httpHeaders: HttpHeaders;

  postCreated$ = new Subject<Post>();

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.accessToken = this.authService.getAccessToken();

    if (!this.accessToken)
      throw Error("Unauthenticated");

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  likePost(postId: number): Observable<LikeResponse> {
    const body: LikeRequest = { post_id: postId, type: 'p' }
    return this.http.post<LikeResponse>(`${this.baseUrl}`, body, {headers: this.httpHeaders});
  }

  deleteLike(likeId: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.baseUrl}/${likeId}`, {headers: this.httpHeaders});
  }
}
