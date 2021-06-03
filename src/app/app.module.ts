import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormsModule } from '@angular/forms';
import { PostPageComponent } from './components/post-page/post-page.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    HeroComponent,
    BlogListComponent,
    BlogCardComponent,
    HomeComponent,
    BlogPageComponent,
    ErrorPageComponent,
    PostPageComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
