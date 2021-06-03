import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../model/Comment';


@Injectable({
    providedIn: 'root',
  })
export class CommentsService {

    protected basePath = 'https://mi-blogs.azurewebsites.net/';

    constructor(protected httpClient: HttpClient) {
       
    }

   
    public getAllComments(): Observable<Array<Comment>> {

        return this.httpClient.request<Array<Comment>>('get',`${this.basePath}/api/Comments`);
    }

    public deleteCommentById(id: number): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteCommentById.');
        }

        return this.httpClient.request<any>('delete',`${this.basePath}/api/Comments/${encodeURIComponent(String(id))}`);
    }

    public getCommentById(id: number): Observable<Comment> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getCommentById.');
        }

        return this.httpClient.request<Comment>('get',`${this.basePath}/api/Comments/${encodeURIComponent(String(id))}`);
    }

    public updateCommentById(id: number, body?: Comment): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateCommentById.');
        }

        return this.httpClient.request<any>('put',`${this.basePath}/api/Comments/${encodeURIComponent(String(id))}`,
            {
                body: body
            }
        );
    }

    public createComment(body?: Comment): Observable<Comment> {

        return this.httpClient.request<Comment>('post',`${this.basePath}/api/Comments`,
            {
                body: body
            }
        );
    }

}
