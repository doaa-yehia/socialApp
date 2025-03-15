import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,
            
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  loading:WritableSignal<boolean>=signal(false);
  private readonly formBuilder=inject(FormBuilder);
  private readonly usersService=inject(UsersService);
  private readonly router=inject(Router);

  loginForm:FormGroup=this.formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  });

  submitForm():void{
    if (this.loginForm.valid) {
      this.loading.set(true);

      this.usersService.getSingIn(this.loginForm.value).subscribe({
        next:(res)=>{
          if (res.message==="success") {
            

            localStorage.setItem('userToken',res.token);

            // get user Data
            this.usersService.getuserData().subscribe({
              next:(res)=>{
                if(res.message==="success"){
                  this.usersService.userData.set(res.user);
                  console.log(this.usersService.userData());
                  
                }
              }
            })
            setTimeout( ()=>{
              this.router.navigate(['/home']);

            },700 );

            this.loading.set(false);

            Swal.fire({
              icon: "success",
              title: "Success Operation",
              text: res.message,
            });
          }
        },
        error:()=>{
          this.loading.set(false);
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
