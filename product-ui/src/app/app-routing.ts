import { EditProductResolver } from './../components/products/products.resolver';
import { ViewCartComponent } from './../components/products/view-cart/view-cart.component';
import { ManageProductsComponent } from './../components/products/manage-products/manage-products.component';
import { LoginComponent } from './../components/login/login.component';
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ProductsComponent } from '../components/products/products.component';
import { AddEditProductComponent } from '../components/products/add-edit-product/add-edit-product.component';
import { ProductsResolver } from '../components/products/products.resolver';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // {
    //     path: 'signup',
    //     component: SignUpComponent
    // },
    {
        path: 'products',
        component: ProductsComponent,
        // canActivateChild: [AuthGuard],
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'manage',
                resolve: {
                    products: ProductsResolver
                },
                component: ManageProductsComponent
            },
            {
                path: 'view',
                resolve: {
                    products: ProductsResolver
                },
                component: ViewCartComponent
            },
            {
                path: ':name',
                resolve: {
                    product: EditProductResolver
                },
                component: AddEditProductComponent
            }
        ]
    },

]

export const appRoutes = RouterModule.forRoot(routes);