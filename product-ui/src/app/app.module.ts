import { AuthGuard } from './auth-guard';
import { LoaderComponent } from './../components/loader/loader.component';
import { ProductsService } from '../components/products/products.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { appRoutes } from './app-routing';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ManageProductsComponent } from '../components/products/manage-products/manage-products.component';
import { AddEditProductComponent } from '../components/products/add-edit-product/add-edit-product.component';
import { ProductsComponent } from '../components/products/products.component';
import { ViewCartComponent } from '../components/products/view-cart/view-cart.component';
import { UtilClass } from '../common/util/util';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsResolver, EditProductResolver } from '../components/products/products.resolver';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderService } from '../components/header/header.service';
import { LoaderInterceptor } from '../components/loader/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ManageProductsComponent,
    AddEditProductComponent,
    ProductsComponent,
    ViewCartComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService, UtilClass, ProductsResolver, EditProductResolver, HeaderService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
