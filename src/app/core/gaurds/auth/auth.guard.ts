import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const platForm_ID=inject(PLATFORM_ID);
  const router=inject(Router);

  if(isPlatformBrowser(platForm_ID)){
    if(localStorage.getItem('userToken')){
      return true;
    }else{
      router.navigate(['/register']);
      return false;
    }
  }else{
    return false;

  }

};
