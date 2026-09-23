import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './Shared/Models/Product';
import { Pagination } from './Shared/Models/Pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.Component.html',
  styleUrl: './app.Component.css'
})
export class AppComponent implements OnInit {
  baseUrl='https://localhost:44364/api/';
  //injecting httpclient to make api calls
private http=inject(HttpClient);


title="SkiNet";

products:Product[]=[];
ngOnInit(): void {
this.http.get<Pagination<Product>>(this.baseUrl+'products').subscribe({
 next: response => {
  this.products=response.Data;
},
  error:error=>{
    console.log(error);
  },
  complete:()=>{
    console.log('Request completed');
  }

})

}

}
