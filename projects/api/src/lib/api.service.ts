import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Comment, Post, User } from '@origo/interfaces';
import { Observable } from 'rxjs';
import { ApiModule } from './api.module';
import { API_KEY } from './api.token';

@Injectable({
  providedIn: ApiModule,
})
export class ApiService {
  constructor(
    @Inject(API_KEY) private apiKey: string,
    private http: HttpClient
  ) {}

  getPosts(params?: HttpParams): Observable<Post[]> {
    if (params) {
      return this.http.request<Post[]>('get', `${this.apiKey}/posts`, {
        params,
      });
    }
    return this.http.get<Post[]>(`${this.apiKey}/posts`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiKey}/posts/${id}`);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.apiKey}/posts/${id}`);
  }

  createPost(body: Pick<Post, 'body' | 'title' | 'userId'>) {
    return this.http.post(`${this.apiKey}/posts`, body);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.apiKey}/users`);
  }

  getCommentsByPostId(params: HttpParams) {
    return this.http.get<Comment[]>(`${this.apiKey}/comments`, { params });
  }
}
