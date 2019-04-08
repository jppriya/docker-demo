import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService,
    private router: Router) { }

  ngOnInit() {
  }

  public get cartCount() {
    if (this.productsService.cartId) {
      return this.productsService.cartId.length
    }
    return 0;
  }

  gotoCart() {
    this.router.navigate(['/products/view']);
  }

}
