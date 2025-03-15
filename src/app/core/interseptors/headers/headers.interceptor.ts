import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platform_id=inject(PLATFORM_ID);

  if(isPlatformBrowser(platform_id)){
    if(localStorage.getItem('userToken')){
      req=req.clone({
        setHeaders:{
          token:localStorage.getItem('userToken') as string,
        }
      });

    }
  }
  return next(req);
};
