import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilClass } from "../../common/util/util";
import { environment } from "../../environments/environment";

@Injectable()
export class ProductsService {
    cartId: number[] = [];
    constructor(private _httpClient: HttpClient,
        private utilClass: UtilClass) {

    }

    get baseUrl(): string {
        return environment.baseUrl;
    }

    getProducts() {
        return this._httpClient.get(this.baseUrl + "/products", { headers: this.getHeaders() });
    }
    getBooks() {
        return this._httpClient.get(this.baseUrl + "/products/allBooks", { headers: this.getHeaders() });
    }

    addProduct(product: any) {
        return this._httpClient.post(this.baseUrl + "/products", product, { headers: this.getHeaders() });
    }

    private getHeaders(): any {
        return {
            'Authorization': 'Bearer ' + this.utilClass.getIdToken(),
        };
    }

    getProductByIdAndName(productId: any, productName: any) {
        return this._httpClient.get(this.baseUrl + "/products/" + productId + "/" + productName, { headers: this.getHeaders() });
    }

    deleteProduct(productId: any, productName: any) {
        return this._httpClient.delete(this.baseUrl + "/products/" + productId + "/" + productName, { headers: this.getHeaders() });
    }
}