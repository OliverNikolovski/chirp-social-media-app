import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {SaveCommentRequest} from "../requests/save-comment.request";
import {Observable} from "rxjs";
import {CommentResponse} from "../responses/comment.response";
import {Injectable} from "@angular/core";
import {CommentsPaginationResponse} from "../responses/comments-pagination.response";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8000/api/comments';
  private readonly accessToken: string | null;
  private readonly httpHeaders: HttpHeaders;

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

  save(request: SaveCommentRequest): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(`${this.baseUrl}`, request, {headers: this.httpHeaders});
  }

  getCommentsForPost(postId: number, page: number): Observable<CommentsPaginationResponse> {
    const params = new URLSearchParams();
    params.set('post_id', postId.toString());
    params.set('page', page.toString());
    return this.http.get<CommentsPaginationResponse>(`${this.baseUrl}?${params.toString()}`, {headers: this.httpHeaders});
  }

}
