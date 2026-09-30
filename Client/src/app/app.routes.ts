import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/home.component';
import { ShopComponent } from './Features/shop/shop.component';
import { ProductDetailsComponent } from './Features/product-details/product-details.component';
import { TestErrorComponent } from './Features/test-error/test-error.component';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { ServerErrorComponent } from './Shared/Components/server-error/server-error.component';
import { CartComponent } from './Features/cart/cart.component';
import { CheckoutComponent } from './Features/checkout/checkout.component';
import { LoginComponent } from './Features/account/login/login.component';
import { RegisterComponent } from './Features/account/register/register.component';
import { authGuard } from './Core/guards/auth-guard';
import { emptyCartGuard } from './Core/guards/empty-cart-guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'shop',component:ShopComponent},
    {path:'shop/:id',component:ProductDetailsComponent},
    {path:'cart',component:CartComponent},
    {path:'checkout',component:CheckoutComponent,canActivate:[authGuard,emptyCartGuard]},
    {path:'account/login',component:LoginComponent},
    {path:'account/register',component:RegisterComponent},
    {path:'testerror',component:TestErrorComponent},
 {path:'notfound',component:NotFoundComponent},
    {path:'servererror',component:ServerErrorComponent},

    {path:'**',redirectTo:'notfound',pathMatch:'full'},
];
