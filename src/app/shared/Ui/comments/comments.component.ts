import { Component, inject, Input, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { IComment } from '../../interfaces/icomment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  // id:InputSignal<string>=input.required<string>();

  @Input({ required: true }) id: string = '';
  commentList: WritableSignal<IComment[]> = signal([]);
  commentForm: WritableSignal<FormGroup> = signal({} as FormGroup);
  
  private readonly commentsService = inject(CommentsService);
  private readonly formBuilder = inject(FormBuilder);
 
  ngOnInit(): void {
    this.getComments();
    this.commentForm.set(this.formBuilder.group({
      content: [null],
      post: [this.id]
    })
    )
  }


  getComments(): void {
    this.commentsService.getPostsComments(this.id).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.commentList.set(res.comments.reverse());

        }
      }
    })
  }

  creatComment():void{
    this.commentsService.creatComment(this.commentForm().value).subscribe({
      next:(res)=>{
        if(res.message==="success"){
          this.commentList.set(res.comments.reverse());
          this.commentForm().get('content')?.reset();
        }
      }
    })
  }
}
