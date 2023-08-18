import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {PostsPaginationResponse} from "../responses/posts-pagination-response";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8000/api/posts';
  private accessToken: string | null;
  private httpHeaders: HttpHeaders;

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

  getPosts(): Observable<PostsPaginationResponse> {
    return this.http.get<PostsPaginationResponse>(`${this.baseUrl}`, {headers: this.httpHeaders});
  }

}
