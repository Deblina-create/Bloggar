import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Config from 'src/app/Config';
import { Blog } from 'src/model/Blog';
import { Post } from 'src/model/Post';
import { BlogService } from 'src/services/blogs.service';
import { PostsService } from 'src/services/posts.service';


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  id: number = -1; 
  editable: boolean = false;
  blog: Blog = new Blog();
  createPostUrl: string= "";
  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService, private postService: PostsService) { }

  ngOnInit(): void {
    console.log("Route", this.route);
    
    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id'));
    });
    this.editable = true;
    if (isNaN(this.id)) {
      this.router.navigate(['error'], {replaceUrl:true});
    }
    else if(this.id === 0){
      //create mode
      //this.editable = true;
      this.blog.userId = Config.userId;
      this.createPostUrl = "/blogs/" + this.blog.id + "/posts/0";
    
    } 
    else if(this.id > 0){
      //update mode
      //this.editable = false;
      this.populateBlog();

    }
  }

  private populateBlog(){
    this.blogService.getBlogById(this.id).subscribe((data: Blog) => {
      this.blog = data;
      this.createPostUrl = "/blogs/" + this.blog.id + "/posts/0";
    });
  }

  saveBlog(){
    if(this.id === 0){
      this.blogService.createBlog(this.blog).subscribe((data: Blog) => {
        this.blog = data;
        this.editable = false;
        this.createPostUrl = "/blogs/" + this.blog.id + "/posts/0";
        this.router.navigate(['blogs' , this.blog.id], {replaceUrl:true});
      });
      
    }
    else{
      this.blogService.updateBlogById(this.id, this.blog).subscribe(() => {
        
        this.editable = false;
      });
      
    }
   
  }

  deleteBlog(){
    this.blogService.deleteBlogById(this.id).subscribe(() => {
      
      this.router.navigate([''], {replaceUrl:true});
    });
  }
  editBlog(){
    this.editable = true;

  }
  getPostUrl(post: Post) : string{
    return "/blogs/" + this.blog.id + "/posts/" + post.id;
  }
  deletePost(post: Post){
    this.postService.deletePostById(post.id).subscribe(() => {
      this.populateBlog();
    });
  }
}
