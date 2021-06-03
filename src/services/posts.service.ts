import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/Post';


@Injectable({
    providedIn: 'root',
  })
export class PostsService {

    protected basePath = 'https://mi-blogs.azurewebsites.net/';

    constructor(protected httpClient: HttpClient) {
        
    }

    public getAllPosts(): Observable<Array<Post>>{

        return this.httpClient.request<Array<Post>>('get',`${this.basePath}/api/Posts`);
    }

 
    public deletePostById(id: number): Observable<any>{

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deletePostById.');
        }

        return this.httpClient.request<any>('delete',`${this.basePath}/api/Posts/${encodeURIComponent(String(id))}`);
    }

    public getPostById(id: number): Observable<Post> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getPostById.');
        }

        return this.httpClient.request<Post>('get',`${this.basePath}/api/Posts/${encodeURIComponent(String(id))}`);
    }

    public updatePostById(id: number, body?: Post): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updatePostById.');
        }

        return this.httpClient.request<any>('put',`${this.basePath}/api/Posts/${encodeURIComponent(String(id))}`,
            {
                body: body
            }
        );
    }

    public createPost(body?: Post): Observable<Post> {

        return this.httpClient.request<Post>('post',`${this.basePath}/api/Posts`,
            {
                body: body
            }
        );
    }

}
