import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

export class ProductForm {
    formGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            'productId': new FormControl('', [Validators.required]),
            'productName': new FormControl('', [Validators.required]),
            'productDesc': new FormControl('', [Validators.required]),
            'productCost': new FormControl('', Validators.required),
            'quantity': new FormControl(''),
        });
    }

    public productForm(): FormGroup {
        return this.formGroup;
    }
}