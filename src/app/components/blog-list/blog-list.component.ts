import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../model/Blog';
import { BlogService }  from '../../../services/blogs.service'
import Config from '../../Config'

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs:Blog[] = [];
  constructor(private blogService: BlogService) { }

  private populateData(): void{
    this.blogService.blogs$.subscribe((data: Blog[]) => {
      this.blogs = data;
    });
    this.blogService.getBlogsByUserId(Config.userId);
  }

  ngOnInit(): void {
    this.populateData();
  }
  deleteBlog(blog:Blog){
    this.blogService.deleteBlogById(blog.id).subscribe(() => {
      this.populateData();
    });
  }
}
