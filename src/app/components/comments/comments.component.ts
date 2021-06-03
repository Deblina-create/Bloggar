import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/model/Comment';
import { CommentsService } from 'src/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[] = [];
  @Input() postId: number = 0;
  @Output() onCommentCreated: EventEmitter<Comment> =
  new EventEmitter<Comment>();
  newComment: Comment = new Comment();
  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }
  
  saveComment(){
    const comment1 = {
      ...this.newComment,
      postId: this.postId
    };
    this.commentsService.createComment(comment1).subscribe((data: Comment) => {
      
      comment1.id = data.id;
      this.onCommentCreated.emit(comment1);
      this.newComment = new Comment();
    });
  }
}
