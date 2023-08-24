import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Post} from "../models/post";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {PostsPaginationResponse} from "../responses/posts-pagination-response";
import {PostResponse} from "../responses/post.response";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8000/api/posts';
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

  getPosts(page: number): Observable<PostsPaginationResponse> {
    return this.http.get<PostsPaginationResponse>(`${this.baseUrl}?page=${page}`, {headers: this.httpHeaders});
  }

  createPost(textContent: string | null, image: File | null): Observable<PostResponse> {
    const formData = new FormData();
    formData.set('type', 'p');
    textContent && formData.set('text_content', textContent);
    image && formData.set('image', image, image.name);
    const headers = {'Authorization': `Bearer ${this.accessToken}`};
    return this.http.post<PostResponse>(`${this.baseUrl}`, formData, {headers});
  }

}
