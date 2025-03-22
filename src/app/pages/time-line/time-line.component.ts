import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPost } from '../../shared/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../../shared/Ui/comments/comments.component";
import { UsersService } from '../../core/services/users/users.service';
import { IUser } from '../../shared/interfaces/iuser';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time-line',
  imports: [DatePipe, CommentsComponent,FormsModule],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss'
})
export class TimeLineComponent implements OnInit {
  
  private readonly postsService=inject(PostsService);
  private readonly usersService=inject(UsersService);
  private readonly toastrService=inject(ToastrService);
  
  
  postList:WritableSignal<IPost[]>=signal([]);
  userInfo:WritableSignal<IUser>=signal({} as IUser);
  content:WritableSignal<string>=signal("");
  // savedFile:WritableSignal<File>=signal( {} as File);
  savedFile!:File;
  isModelOpen = signal(false);

  ngOnInit(): void {
    this.getPosts();
    this.getdata();
  }

  getPosts():void{
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        this.postList.set(res.posts.reverse());
        console.log(this.postList());
      }
    });
  }
  getdata():void{
    this.usersService.getuserData().subscribe({
      next:(res)=>{
        this.userInfo.set(res.user)
        
      }
    })
  }
  toggleModel() {
    this.isModelOpen.set(!this.isModelOpen());
  }

  changeImage(e:Event):void{
    const input=e.target as HTMLInputElement;
    if (input.files && input.files.length>0) {
      this.savedFile=input.files[0];
    }
  }

  creatPost():void{
    // creat formData
    const formData=new FormData();
    if(!(this.content()==='')&& this.savedFile){
      formData.append('body',this.content());
      formData.append("image",this.savedFile);

      this.sendPost(formData);
      // formData.set('body', '' );

    }
    else if (!(this.content()==='')) {
      formData.append('body',this.content());
      this.sendPost(formData);
      // formData.set('body', '' );
    }
    else if (this.savedFile) {
      formData.append("image",this.savedFile);
      this.sendPost(formData);
    }
    else{
      this.toastrService.error( 'you must inter content or file' ,'socialApp');

    }
 
    
  
  }

  sendPost(data:FormData):void{
           // send Data to API
           this.postsService.creatPosts(data).subscribe({
            next:(res)=>{
              if (res.message==='success') {
      
                this.toastrService.success(res.message,'socialApp');
      
                this.getPosts();
      
              }
            }
          })
  }
 
}
