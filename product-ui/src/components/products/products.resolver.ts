import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { ProductsService } from './products.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductsResolver implements Resolve<any> {
    constructor(private productService: ProductsService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.productService.getProducts().map(response => response);
    }
}
@Injectable()
export class EditProductResolver implements Resolve<any> {
    private name: string;
    private id: string;
    private isAdd: boolean = false;
    constructor(private productsService: ProductsService) {

    }
    resolve(route: ActivatedRouteSnapshot) {
        this.name = route.queryParams['productName'];
        this.id = route.queryParams['productId'];
        this.isAdd = route.params['name'] === 'add';

        if (this.name !== 'add' && !!this.id && this.name) {
            return this.productsService.getProductByIdAndName(this.id, this.name).map(data => data);
        } 
        return Observable.of(null);
    }
}