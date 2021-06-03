import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Blog } from '../model/Blog';


@Injectable({
    providedIn: 'root',
  })
export class BlogService {

    private basePath = 'https://mi-blogs.azurewebsites.net/';

    private blogs = new Subject<Blog[]>();
    blogs$ = this.blogs.asObservable();

    constructor(protected httpClient: HttpClient) {
        
    }


    public deleteBlogById(id?: number): Observable<any>{

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteBlogById.');
        }


        return this.httpClient.request<any>('delete',`${this.basePath}/api/Blogs/${encodeURIComponent(String(id))}`);
    }

    public getBlogById(id: number): Observable<Blog>{

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getBlogById.');
        }


        return this.httpClient.request<Blog>('get',`${this.basePath}/api/Blogs/${encodeURIComponent(String(id))}`);
    }


    public updateBlogById(id: number, body?: Blog): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateBlogById.');
        }

        return this.httpClient.request<any>('put',`${this.basePath}/api/Blogs/${encodeURIComponent(String(id))}`,
            {
                body: body
            }
        );
    }

    public createBlog(body?: Blog): Observable<Blog> {

        return this.httpClient.request<Blog>('post',`${this.basePath}/api/Blogs`,
            {
                body: body
            }
        );
    }


    public getBlogsByUserId(userId: number): void{

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getBlogsByUserId.');
        }

        this.httpClient.get<Array<Blog>>(`${this.basePath}/api/Blogs/user/${encodeURIComponent(String(userId))}`)
        .subscribe((data) => {
            this.blogs.next(data);
          });
    }

}

