import { ProductsService } from './../products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductForm } from './../../../common/forms-generation/product-form';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditProductComponent implements OnInit {
  products: any[] = [];
  productForm: FormGroup;
  name: string;
  isAdd: boolean = false;
  id: any;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private fb: FormBuilder
  ) {
    this.productForm = new ProductForm(this.fb).productForm();

    this.name = this.activatedRoute.snapshot.queryParams['productName'];
    this.id = this.activatedRoute.snapshot.queryParams['productId'];
    this.isAdd = this.activatedRoute.snapshot.params['name'] === 'add';
    this.successMessage = undefined;

    if (this.name !== 'add' && !!this.id && this.name) {

      let product: any = this.activatedRoute.snapshot.data['product'];
      console.log("EDIT PRODUCT", product);
      this.productForm.patchValue(product);

    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.cdr.detectChanges();
  }

  manageProducts() {

    this.router.navigate(['/products/manage']);
  }

  successMessage: string;
  addOrUpdateProduct() {
    this.successMessage = undefined;

    this.productService.addProduct(this.productForm.getRawValue()).finally(() => {
      if (this.isAdd) {

        this.successMessage = 'Product Added Succesfully!!';
        this.router.navigate(['products/manage'])
      } else {
        this.successMessage = 'Product Updated Succesfully!!';
        this.router.navigate(['products/manage'])

      }
    }).subscribe(resp => {

    });
  }


}
