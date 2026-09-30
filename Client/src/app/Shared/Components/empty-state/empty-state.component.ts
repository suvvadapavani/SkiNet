import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../Core/Services/cart.service';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { emptyCartGuard } from '../../../Core/guards/empty-cart-guard';
import { CartTemComponent } from '../../../Features/cart/cart-tem/cart-tem.component';

@Component({
  selector: 'app-empty-state',
  imports: [MatIcon,
    MatButton, RouterLink, OrderSummaryComponent,EmptyStateComponent,CartTemComponent],
    standalone:true,
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  cartService=inject(CartService);

}
