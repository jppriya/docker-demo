import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

export class LoginForm {

    formGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            'userName': new FormControl('', [Validators.required]),
            'password': new FormControl('', [Validators.required])
        });
    }

    public loginForm(): FormGroup {
        return this.formGroup;
    }
}