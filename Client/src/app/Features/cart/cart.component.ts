import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';
import { CartTemComponent } from './cart-tem/cart-tem.component';
import { OrderSummaryComponent } from '../../Shared/Components/order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [CartTemComponent,OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
    private router = inject(Router);
  cartService = inject(CartService);
  
  onAction() {
    this.router.navigateByUrl('/shop');
  }
}
