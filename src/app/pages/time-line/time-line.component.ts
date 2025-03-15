import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPost } from '../../shared/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../../shared/Ui/comments/comments.component";

@Component({
  selector: 'app-time-line',
  imports: [DatePipe, CommentsComponent],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss'
})
export class TimeLineComponent implements OnInit {
  
  private readonly postsService=inject(PostsService);
  postList:WritableSignal<IPost[]>=signal([]);
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts():void{
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        this.postList.set(res.posts);
        console.log(this.postList());
      }
    });
  }
}
