import { Component, inject } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatBadge} from '@angular/material/badge';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BusyService } from '../../Core/Services/busy.service';
import {MatProgressBar} from '@angular/material/progress-bar';
import { CartService } from '../../Core/Services/cart.service';
import { AccountService } from '../../Core/Services/account.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, 
    MatButton, MatBadge, RouterLink,
    RouterLinkActive,MatProgressBar,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  busyservice=inject(BusyService)
  cartService=inject(CartService);
  accountService=inject(AccountService);
  private router=inject(Router)
  
 logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    });
  }

}
