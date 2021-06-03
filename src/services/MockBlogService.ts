import { Observable, Subject } from 'rxjs';
import { Blog } from '../model/Blog';
import Config from 'src/app/Config';

export class MockBlogService {
    private blogs = new Subject<Blog[]>();
    blogs$ = this.blogs.asObservable();
    
  
    constructor() {}
  
    testData: Blog[] = [
      { id: 1, title: 'Majsan', created: new Date(), userId: Config.userId, posts: [] },
      { id: 2, title: 'Sven', created: new Date(), userId: Config.userId, posts: [] },
    ];
  
    getBlogsByUserId (): void {
      this.blogs.next(this.testData);
      
    }
}
