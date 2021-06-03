import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Blog } from 'src/model/Blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  editUrl: string = "";
  @Input() blog:Blog={};
  @Output() onDelete: EventEmitter<Blog> =
  new EventEmitter<Blog>();
  constructor() { }

  ngOnInit(): void {
    this.editUrl = "/blogs/" + this.blog.id;
  }
  deleteBlog(){
    this.onDelete.emit(this.blog);
  }
}
