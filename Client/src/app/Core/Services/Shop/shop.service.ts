import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../../Shared/Models/Product';
import { Pagination } from '../../../Shared/Models/Pagination';
import { ShopParams } from '../../../Shared/Models/ShopParams';

@Injectable({//means that we can inject this service wherever we want to use it in our angular code
  providedIn: 'root',//when application starts up it is provided automatically and can be used anywhere in the application
})
export class ShopService {
    baseUrl='https://localhost:44364/api/';
  //injecting httpclient to make api calls
private http=inject(HttpClient);
types:string[]=[];
brands:string[]=[];

getProducts(shopParams:ShopParams){
  let params=new HttpParams();
  if(shopParams.brands.length>0){
    params=params.append('brands',shopParams.brands.join(','))
  }
  if(shopParams.types.length>0){
    params=params.append('types',shopParams.types.join(','))
  }
  if(shopParams.sort){
    params=params.append('sort',shopParams.sort)
  }
  if(shopParams.search){
    params=params.append('search',shopParams.search)
  }
  params=params.append('pageSize',shopParams.pageSize)
  params=params.append('pageIndex',shopParams.pageNumber)
  return this.http.get<Pagination<Product>>(this.baseUrl+'products',{params})
}
getProduct(id:number){
  return this.http.get<Product>(this.baseUrl+'Products/'+id);
}
getBrands(){
  if(this.brands.length>0) return;
  return this.http.get<string[]>(this.baseUrl+'products/brands').subscribe({
    next:response=>this.brands=response
  })
}
getTypes(){
  if(this.types.length>0) return;
  return this.http.get<string[]>(this.baseUrl+'products/types').subscribe({
    next:response=>this.types=response
  })
}
}