import { Component, inject, input } from '@angular/core';
import { CartItem } from '../../../Shared/Models/cart';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart.component';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../../Core/Services/cart.service';

@Component({
  selector: 'app-cart-tem',
   standalone:true,
  imports: [
    RouterLink,
    MatIcon,
    CurrencyPipe,
    MatButton,
    MatIconButton
  ],
  templateUrl: './cart-tem.component.html',
  styleUrl: './cart-tem.component.scss',
})
export class CartTemComponent {

 cartService = inject(CartService);
  item = input.required<CartItem>();

  incrementQuantity() {
    this.cartService.additemToCart(this.item());
  }

  decrementQuantity() {
    this.cartService.removeItemFromCart(this.item().productId);
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(this.item().productId, this.item().quantity);
  }
}
