import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

export class SignUpForm {
    formGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            'name': new FormControl('', [Validators.required]),
            'gender': new FormControl('', [Validators.required]),
            'email': new FormControl('', [Validators.required]),
            'address': new FormControl('', [Validators.required]),
            'phone': new FormControl('', [Validators.required]),
            'preferredUserName': new FormControl('', [Validators.required]),
            'updatedAt': new FormControl('', [Validators.required]),
            'password': new FormControl('', [Validators.required]),
            
        });
    }

    public signUpForm(): FormGroup {
        return this.formGroup;
    }
}