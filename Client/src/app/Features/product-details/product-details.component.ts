import { Component, inject, OnInit } from '@angular/core';
import { ShopComponent } from '../shop/shop.component';
import { ShopService } from '../../Core/Services/Shop/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Shared/Models/Product';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-product-details',
  standalone:true,
  imports: [CurrencyPipe, MatButton, MatIcon, MatFabButton, MatFormField, MatLabel, MatDivider,MatInputModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService=inject(ShopService)
  private activatedRoute=inject(ActivatedRoute)
  product?:Product
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(){
    const id=this.activatedRoute.snapshot.paramMap.get('id')//match the id mentioned in the Routes
  if(!id) return;
  this.shopService.getProduct(+id).subscribe({
    next:res=>this.product=res,
    error:err=>console.log(err)
  })

  
  }
}
