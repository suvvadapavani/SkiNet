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
import { CartService } from '../../Core/Services/cart.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-details',
  standalone:true,
  imports: [CurrencyPipe, MatButton,
     MatIcon, MatFabButton, MatFormField, MatLabel, MatDivider,
     MatInputModule,FormsModule
    ],

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService=inject(ShopService)
  private activatedRoute=inject(ActivatedRoute)
  private cartservice=inject(CartService)

  product?:Product
  quantityInCart=0;
  quantity=0;
  


  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(){
    const id=this.activatedRoute.snapshot.paramMap.get('id')//match the id mentioned in the Routes
  if(!id) return;
  this.shopService.getProduct(+id).subscribe({
    next:product=>{
      this.product=product;
      this.updateQuantityInCart();
    },
    error:err=>console.log(err)
  })
}

updateCart(){
  if(!this.product) return
  if(this.quantity>this.quantityInCart){
    const itemsToAdd=this.quantity-this.quantityInCart
    this.quantityInCart+=itemsToAdd;
    this.cartservice.additemToCart(this.product,itemsToAdd)
  }
  else{
    const itemsToRemove=this.quantityInCart-this.quantity
    this.quantityInCart-=itemsToRemove;
    this.cartservice.removeItemFromCart(this.product.id,itemsToRemove)

  }
}

updateQuantityInCart(){
  this.quantityInCart=
  this.cartservice.cart()?.items
  .find(x=>x.productId===this.product?.id)?.quantity||0;
this.quantity=this.quantityInCart||1;
}

getButtonText(){
  return this.quantityInCart>0?'update cart':'Add to Cart'
}
  
  
}
