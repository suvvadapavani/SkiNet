import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 //we have to use cloned request to get updated version of the request
  const clonedRequest=req.clone({
    withCredentials:true
  })
  return next(clonedRequest);
};
