import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Router } from '@angular/router';
import { UtilClass } from '../../common/util/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private utilClass: UtilClass,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
  }

  get count(): number {
    return this.productsService.cartId.length;
  }

  get name(): string {
    let currentUser: any = this.utilClass.getCurrentUser();
    return currentUser ? currentUser.getUsername() : '';
  }

  gotoCart() {
    if (this.productsService.cartId && this.productsService.cartId.length > 0) {
      this.router.navigate(['/products/view']);
    }
  }

  logout() {
    this.utilClass.getCurrentUser().signOut();
    this.productsService.cartId = [];
    this.router.navigate(['/login'])
  }

}
