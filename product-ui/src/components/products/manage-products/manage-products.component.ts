import { UtilClass } from './../../../common/util/util';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../products.service';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Component({
  selector: 'manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ManageProductsComponent implements OnInit {
  products: any = [];
  cartCount: number = 0;
  successMessage: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private utilClass: UtilClass
  ) {
    this.products = this.activatedRoute.snapshot.data['products'];
  }

  private getProducts() {
    this.products = [];
    this.productsService.getProducts().subscribe(val => {
      this.products = val;
      this.productsService.getBooks().subscribe((value) => {
        if (Boolean(value)) {
          this.products.push(value);
        }
      });
    }, (err) => {
    });
  }

  ngOnInit() {
    this.productsService.getBooks().subscribe((value) => {
      if (Boolean(value)) {
        this.products = this.products.concat(value);
      }
    });
  }

  editProductDetails(product: any) {
    this.successMessage = undefined;
    this.router.navigate([`/products/edit`], {
      queryParams: {
        'productId': product.productId,
        'productName': product.productName
      }
    });
  }

  addProduct() {
    this.successMessage = undefined;
    this.router.navigate([`/products/add`]);

  }

  addToCart(product: any) {
    this.successMessage = undefined;
    if (!this.productsService.cartId.includes(product.productId)) {
      this.productsService.cartId.push(product.productId);
    }
    this.cartCount = this.productsService.cartId.length;
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  deleteProduct(product: any) {
    this.successMessage = undefined;
    this.productsService.deleteProduct(product.productId, product.productName).finally(() => {
      this.getProducts();
    }).subscribe(resp => {
      this.successMessage = "Product Deleted Successfully!!";

    });
  }

}
