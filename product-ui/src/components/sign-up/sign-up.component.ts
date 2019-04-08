import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SignUpForm } from '../../common/forms-generation/signup-form';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  ICognitoUserAttributeData,
  ISignUpResult,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: any;
  isError: boolean;
  constructor(private fb: FormBuilder,
    private router: Router) {
    this.signupForm = new SignUpForm(this.fb).signUpForm();
  }

  ngOnInit() {
  }


  signUp() {
    this.isError = false;
    let userDetails: any = this.signupForm.getRawValue();
    let poolData = {
      UserPoolId: 'us-east-1_iXFGnaig8', // Your user pool id here
      ClientId: '57u19vbrmhfp7l15g07v9djmcs' // Your client id here
    };
    let userPool = new CognitoUserPool(poolData);
    let attributeList = [];

    let name = {
      Name: 'name',
      Value: userDetails.name
    };
    let gender = {
      Name: 'gender',
      Value: userDetails.gender
    };
    let email = {
      Name: 'email',
      Value: userDetails.email
    };
    let address = {
      Name: 'address',
      Value: userDetails.address
    };
    let phone = {
      Name: 'phone_number',
      Value: userDetails.phone
    };
    let preferredUserName = {
      Name: 'preferred_username',
      Value: userDetails.preferredUserName
    };
    let updatedAt = {
      Name: 'updated_at',
      Value: userDetails.updatedAt
    };
    attributeList.push(new CognitoUserAttribute(name));
    attributeList.push(new CognitoUserAttribute(gender));
    attributeList.push(new CognitoUserAttribute(address));
    attributeList.push(new CognitoUserAttribute(phone));
    attributeList.push(new CognitoUserAttribute(preferredUserName));
    attributeList.push(new CognitoUserAttribute(updatedAt));
    attributeList.push(new CognitoUserAttribute(email));
    if (!userDetails.email) {
      this.isError = true;
      this.errorMessage = "User name can't be empty";
      return
    }
    if (!userDetails.password) {
      this.isError = true;
      this.errorMessage = "Password can't be empty";
      return;
    }
    userPool.signUp(userDetails.email, userDetails.password, attributeList, null, (err, result) => {
      if (err) {
        const error = JSON.parse(JSON.stringify(err));
        this.isError = true;
        this.errorMessage = error.message;
        return;
      }
      this.router.navigate(['/login']);
    });
    // console.log("SIGN UP VALUE ", this.signupForm.getRawValue());

  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
}
