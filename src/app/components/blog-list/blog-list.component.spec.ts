import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListComponent } from './blog-list.component';
import { BlogService }  from '../../../services/blogs.service';
import { MockBlogService }  from '../../../services/MockBlogService';
import { HttpClientModule } from '@angular/common/http';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogListComponent ],
      imports: [HttpClientModule],
      providers: [{ provide: BlogService, useClass: MockBlogService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have blogs', () => {
    expect(component.blogs.length).toBe(2);
    expect(component.blogs[0].title).toBe('Majsan');
  });
});
