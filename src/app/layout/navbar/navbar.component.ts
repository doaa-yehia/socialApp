import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../../core/services/users/users.service';
import { Component, inject, signal, WritableSignal, OnInit, PLATFORM_ID, computed, Signal } from '@angular/core';
import { IUser } from '../../shared/interfaces/iuser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  private readonly usersService=inject(UsersService);
  private readonly toastrService=inject(ToastrService);
  private readonly platform_ID=inject(PLATFORM_ID);
  
  // myData:WritableSignal<IUser>=signal({} as IUser)
  myData:Signal<IUser>=computed(()=>this.usersService.userData());
  newImg!:File;
  
  ngOnInit(): void {
    this.getUserData();
  }


  getUserData():void{
    if (isPlatformBrowser(this.platform_ID)) {
      if (localStorage.getItem('userToken')) {
        this.usersService.getuserData().subscribe({
          next:(res)=>{
            this.usersService.userData.set(res.user);
          }
        })
      }
    }
   
    
  }

  changeImage(e:Event):void{
    const img=e.target as HTMLInputElement;
    if(img.files&& img.files.length>0){

      this.newImg=img.files[0];
    }
  }

  creatImg():void{
    const imgData=new FormData();
    imgData.append('photo',this.newImg);
    
    this.usersService.updateProfilePhoto(imgData).subscribe({
      next:(res)=>{
        
        this.toastrService.success(res.message,'socialApp');
        this.getUserData();
      }
    })
  }

}
