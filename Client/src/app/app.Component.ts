import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './Shared/Models/Product';
import { Pagination } from './Shared/Models/Pagination';
import { ShopService } from './Core/Services/Shop/shop.service';
import { ShopComponent } from './Features/shop/shop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ShopComponent],
  templateUrl: './app.Component.html',
  styleUrl: './app.Component.css'
})
export class AppComponent {


title="SkiNet";
}



