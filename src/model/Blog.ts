import { Post } from './Post';
export class Blog {
    id?: number;
    title?: string;
    created?: Date;
    userId?: number;
    posts?: Array<Post>;
  }