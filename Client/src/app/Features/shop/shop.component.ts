// import { Component, inject, OnInit } from '@angular/core';
// import { ShopService } from '../../Core/Services/Shop/shop.service';
// import { Product } from '../../Shared/Models/Product';
// import {MatCard} from '@angular/material/card'
// import { ProductItemComponent } from './product-item/product-item.component';
// import {MatDialog} from '@angular/material/dialog'
// import { FiltersDailogComponent } from './filters-dailog/filters-dailog.component';
// import { MatButton } from '@angular/material/button';
// import { MatIcon } from '@angular/material/icon';
// import { MatMenu, MatMenuTrigger,MatMenuItem } from '@angular/material/menu';
// import { MatSelectionListChange } from '@angular/material/list';

// @Component({
//   selector: 'app-shop',
//   standalone: true,
//   imports: [
//   MatCard,
//   ProductItemComponent,
//   MatButton,
//   MatIcon,
//   MatMenu,
//   MatMenuItem,
//   MatMenuTrigger,
  
// ],
//   templateUrl: './shop.component.html',
//   styleUrl: './shop.component.scss',
// })
// export class ShopComponent implements OnInit {
//   private shopService=inject(ShopService);
//   private dialogService=inject(MatDialog)

// title="SkiNet";

// products:Product[]=[];
// selectedBrands:string[]=[];
// selectedTypes:string[]=[];
// selectedSort:string='name';
// sortOptions=[
  
//     {name:'Alphabetical',value:'name'},
//     {name:'price:Low-High',value:'priceAsc'},
//     {name:'price:High-Low',value:'priceDesc'},

  
// ]

// ngOnInit(): void {
  
// this.initializeShop();

// }
// initializeShop(){
//   this.shopService.getBrands();
//   this.shopService.getTypes();
//   this.shopService.getProducts().subscribe({
//     next: response => {
//       console.log("API Response:", response);
//     console.log("First Product:", response.data[0]);
//     console.log("Picture URL:", response.data[0].pictureUrl);

//       this.products=response.data;
//     },
//     error: error => {
//       console.log(error);
//     }
//   });

// }
// onSortChange(sortValue: string) {
//   this.selectedSort = sortValue;
//   console.log('Selected sort:', this.selectedSort);
// }
// openFiltersDialog(){
//   const dialogRef=this.dialogService.open(
//     FiltersDailogComponent,{
//       minWidth:'500p',
//       data:{
//       selectedBrands:this.selectedBrands,
//       selectedTypes:this.selectedTypes
//       }
//     });
// dialogRef.afterClosed().subscribe({
//   next:result=>{
//     if(result)
//     {
//     console.log(result);
//     this.selectedBrands=result.selectedBrands;
//     this.selectedTypes=result.selectedTypes;
//     //apply filters
//     this.shopService.getProducts(this.selectedBrands,this.selectedTypes).subscribe({
//       next:response=>this.products=response.data,
//       error:error=>console.log(error)
      
      
//     })
//     }
//   }

// })
  
// }
    
//   }


import { Component, inject, OnInit } from '@angular/core';

import { ShopService } from '../../Core/Services/Shop/shop.service';
import { Product } from '../../Shared/Models/Product';

import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import { ProductItemComponent } from './product-item/product-item.component';
import { FiltersDailogComponent } from './filters-dailog/filters-dailog.component';
import { ShopParams } from '../../Shared/Models/ShopParams';
import {MatPaginator, PageEvent} from '@angular/material/paginator'
import { Pagination } from '../../Shared/Models/Pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,

  imports: [
    MatCard,
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,
    MatIconButton
],

  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopService = inject(ShopService);

  private dialogService = inject(MatDialog);


  title = 'SkiNet';


  products?: Pagination<Product>;
  pageSizeOptions=[5,10,15,20]

  // selectedBrands: string[] = [];

  // selectedTypes: string[] = [];

  // selectedSort: string = 'name';


  sortOptions = [

    {
      name: 'Alphabetical',
      value: 'name'
    },

    {
      name: 'Price: Low-High',
      value: 'priceAsc'
    },

    {
      name: 'Price: High-Low',
      value: 'priceDesc'
    }

  ];

  shopParams=new ShopParams();


  ngOnInit(): void {

    this.initializeShop();

  }


  initializeShop(): void {

    // Get brands
    this.shopService.getBrands();

    // Get types
    this.shopService.getTypes();
    this.getProducts();

  }

  getProducts(){
    

    // Get products
    this.shopService.getProducts(this.shopParams).subscribe({

      next: response => {

        console.log('API Response:', response);

        console.log('First Product:', response.data[0]);

        console.log(
          'Picture URL:',
          response.data[0]?.pictureUrl
        );


        this.products = response;

      },

      error: error => {

        console.log('Error loading products:', error);

      }

    });

  }

  // handlePageEvent(event:PageEvent){
  //   this.shopParams.pageNumber=event.pageIndex+1
  //   this.shopParams.pageSize=event.pageSize
  //   this.getProducts();
  // }

  onSerachChange(){
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
handlePageEvent(event: PageEvent) {

  console.log('PAGINATOR EVENT FIRED');
  console.log(event);

  this.shopParams.pageNumber = event.pageIndex + 1;
  this.shopParams.pageSize = event.pageSize;

  console.log('Requesting page:', this.shopParams.pageNumber);

  this.getProducts();
}

  onSortChange(sortValue: string): void {

    this.shopParams.sort = sortValue;
    this.shopParams.pageNumber=1
    this.getProducts();

  }


  openFiltersDialog(): void {

    const dialogRef = this.dialogService.open(
      FiltersDailogComponent,
      {
        minWidth: '500px',

        data: {

          selectedBrands: this.shopParams.brands,

          selectedTypes: this.shopParams.types

        }

      }
    );


    dialogRef.afterClosed().subscribe({

      next: result => {

        if (result) {

          console.log('Selected filters:', result);


          this.shopParams.brands =
            result.selectedBrands;

          this.shopParams.types =
             result.selectedTypes;
         this.shopParams.pageNumber=1

        this.getProducts();

          
        }

      }

    });

  }

}