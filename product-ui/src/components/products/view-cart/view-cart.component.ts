import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.less']
})
export class ViewCartComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  successMessage: string;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.successMessage = undefined;
    this.products = this.activatedRoute.snapshot.data['products'];
    this.filteredProducts = this.products.filter(product => this.productsService.cartId.includes(product.productId));
  }

  ngOnInit() {
  }

  decreaseCount(product) {
    product.quantity--;
    if (product.quantity === 0) {
      let index: number = this.productsService.cartId.indexOf(product.productId);
      if (index > -1) {
        this.productsService.cartId.splice(index, 1);
      }
    }
  }

  increaseCount(product) {
    product.quantity++;
    let index: number = this.productsService.cartId.indexOf(product.productId);
    if (index < 0) {
      this.productsService.cartId.push(product.productId);
    }
  }

  get total(): number {
    let total: number = 0;
    this.filteredProducts.forEach(prod => {
      total = total + (prod.quantity * prod.productCost);
      return total;
    });
    return total;
  }

  gotoManage() {
    this.router.navigate(['/products/manage']);
  }

  checkout() {
    console.log("Checkout products", this.filteredProducts);
    this.productsService.cartId = [];
    this.filteredProducts = [];
    this.successMessage = 'Order has been checked out Scuccesfully!'
  }

  ngOnDestroy() {
    this.successMessage = undefined;
  }

}
