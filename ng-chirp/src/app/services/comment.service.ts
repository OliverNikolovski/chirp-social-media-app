import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {SaveCommentRequest} from "../requests/save-comment.request";
import {Observable, of} from "rxjs";
import {CommentResponse} from "../responses/comment.response";
import {Injectable} from "@angular/core";
import {CommentsPaginationResponse} from "../responses/comments-pagination.response";
import {MessageResponse} from "../responses/message.response";

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
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  save(request: SaveCommentRequest): Observable<CommentResponse> {
    const formData = new FormData();
    request.text_content && formData.set('text_content', request.text_content);
    request.image && formData.set('image', request.image);
    formData.set('post_id', request.post_id.toString());
    request.parent_comment_id && formData.set('parent_comment_id', request.parent_comment_id.toString());
    return this.http.post<CommentResponse>(`${this.baseUrl}`, formData, {headers: this.httpHeaders});
  }

  getCommentsForPost(postId: number, page: number): Observable<CommentsPaginationResponse> {
    const params = new URLSearchParams();
    params.set('post_id', postId.toString());
    params.set('page', page.toString());
    return this.http.get<CommentsPaginationResponse>(`${this.baseUrl}?${params.toString()}`, {headers: this.httpHeaders});
  }

  getChildCommentsForComment(commentId: number, page: number): Observable<CommentsPaginationResponse> {
    return this.http.get<CommentsPaginationResponse>(`${this.baseUrl}/${commentId}/child-comments?page=${page}`, {headers: this.httpHeaders});
  }

  delete(commentId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.baseUrl}/${commentId}`, {headers: this.httpHeaders});
  }

}
