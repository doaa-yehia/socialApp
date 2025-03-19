import { UsersService } from './../../core/services/users/users.service';
import { Component, ElementRef, inject, Renderer2, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pattern } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule,
            ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  constructor(private el:ElementRef , private renderer2:Renderer2 ){}
  
  private readonly formBuilder=inject(FormBuilder)
  private readonly UsersService=inject(UsersService)
  private readonly router=inject(Router)
  
  loading:WritableSignal<boolean>=signal(false)
  userPassword:WritableSignal<string>=signal('')
  // @ViewChild('rePassValue') rePassValue!:ElementRef;
  rePass:WritableSignal<string>=signal('')

  changePasswordForm:FormGroup=this.formBuilder.group({
    password:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    newPassword:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  })

  confirmPassword(group:AbstractControl){
    const newPassword=group.get('newPassword')?.value;
    return newPassword===this.rePass?null:{ misMatch: true };
  }
  ngAfterViewInit():void{
  }
  getData(){
    console.log(this.changePasswordForm.get('newPassword')?.value)
    console.log(this.rePass());
    
  }

  submitForm(){
    if(this.changePasswordForm.valid){
      this.loading.set(true);

      this.UsersService.getChangePassword(this.changePasswordForm.value).subscribe({
        next:(res)=>{
          
          localStorage.setItem('userToken',res.token);

          // get user data 
          this.UsersService.getuserData().subscribe({
            next:(res)=>{
              this.UsersService.userData.set(res.user);
              console.log(this.UsersService.userData());
            }
          });
          
          //navigate 
            setTimeout( ()=> {
              this.router.navigate(['/home'])
            },700 );

          this.loading.set(false);

           Swal.fire({
            icon: "success",
            title: "Success Operation",
            text: res.message,
            });
          
        },
        error:()=>{
          this.loading.set(false);
        }
      })

    }else{
      this.changePasswordForm.markAllAsTouched();
    }
  }

}
