import { Blog } from './Blog';
import { Comment } from './Comment';


export class Post {
    id?: number;
    title?: string;
    content?: string;
    created?: Date;
    modified?: Date;
    blog?: Blog;
    comments?: Array<Comment>;
  }