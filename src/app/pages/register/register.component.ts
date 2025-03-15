import { Component, inject, signal, WritableSignal } from '@angular/core';
import{FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators}from '@angular/forms'
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { UsersService } from '../../core/services/users/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,
            RxReactiveFormsModule,
            FormsModule,
            ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  loading:WritableSignal<boolean>=signal(false)
  private readonly formBuilder=inject(FormBuilder);
  private readonly usersService=inject(UsersService);
  private readonly router=inject(Router);

  registerForm:FormGroup=this.formBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword:[null,[Validators.required, RxwebValidators.compare({fieldName:'password' })] ],
  //  RxwebValidators.minDate({value:new Date(12/31/2007)})
    dateOfBirth:[null,[Validators.required]],
    gender:[null,[Validators.required]]
  })

  submitForm():void{
    console.log(this.registerForm);
    if(this.registerForm.valid){
      this.loading.set(true);

      this.usersService.getSingUp(this.registerForm.value).subscribe({
        next:(res)=>{
          if (res.message==="success") {

            setTimeout( ()=>{
              this.router.navigate(['/logIn']);
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
      this.registerForm.markAllAsTouched();
    }
    
  }

}
