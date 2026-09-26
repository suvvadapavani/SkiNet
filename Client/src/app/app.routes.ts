import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/home.component';
import { ShopComponent } from './Features/shop/shop.component';
import { ProductDetailsComponent } from './Features/product-details/product-details.component';
import { TestErrorComponent } from './Features/test-error/test-error.component';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { ServerErrorComponent } from './Shared/Components/server-error/server-error.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'shop',component:ShopComponent},
    {path:'shop/:id',component:ProductDetailsComponent},
    {path:'testerror',component:TestErrorComponent},
        {path:'notfound',component:NotFoundComponent},
    {path:'servererror',component:ServerErrorComponent},

    {path:'**',redirectTo:'notfound',pathMatch:'full'},
];
