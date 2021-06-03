import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/model/Blog';
import { Comment } from 'src/model/Comment';
import { Post } from 'src/model/Post';
import { BlogService } from 'src/services/blogs.service';
import { PostsService } from 'src/services/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  id: number= -1;
  blogId: number= -1;
  editable: boolean= false;
  post: Post= new Post();
  constructor(private route: ActivatedRoute, private router: Router, private postService: PostsService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id'));
      this.blogId = parseInt(params.get('blogId'));
    });
    this.editable = true;
    if (isNaN(this.id)) {
      this.router.navigate(['error']);
    }
    else if(this.id === 0){
      //create mode
      this.getBlog();
    } 
    else if(this.id > 0){
      //update mode
      this.populatePost();
    }
  }

  private populatePost(){
    this.postService.getPostById(this.id).subscribe((data: Post) => {
      this.post = data;
      this.getBlog();
    });
  }
  private getBlog(): void {
    if (isNaN(this.blogId) || this.blogId<= 0) {
      this.router.navigate(['error']);
    }
    else {
      this.blogService.getBlogById(this.blogId).subscribe((data: Blog) => {
        this.post.blog = data;
      });
    }
    
  }
  savePost(){
    if(this.id === 0){
      const newPost = {
        title: this.post.title,
        content: this.post.content,
        created: new Date(),
        modified: new Date(),
        blogId: this.post.blog?.id,
        comments: []
      }
      this.postService.createPost(newPost).subscribe((data: Post) => {
        this.post = data;
        this.editable = false;
        this.router.navigate(['..' , this.post.id], {relativeTo: this.route,replaceUrl:true});
      });
      
    }
    else{
      this.postService.updatePostById(this.id, this.post).subscribe(() => {
        
        this.editable = false;
      });
      
    }
  }
  deletePost(){
    this.postService.deletePostById(this.id).subscribe(() => {
      
      this.router.navigate(['../..'], {relativeTo: this.route, replaceUrl:true});
    });
  }
  editPost(){
    this.editable = true;

  }
  commentCreated(comment: Comment){
    this.populatePost();
  }
}
