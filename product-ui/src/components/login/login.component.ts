import { HeaderService } from './../header/header.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../common/forms-generation/login-form';
import { Route, Router } from '@angular/router';
import { AuthenticationDetails, CognitoUserPool, CognitoUser, ICognitoUserSessionData, CognitoIdToken, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as AWS from "aws-sdk/global";
import * as STS from "aws-sdk/clients/sts";
import { environment } from '../../environments/environment';
import { CognitoIdentity } from 'aws-sdk/clients/all';
import * as awsservice from "aws-sdk/lib/service";
import { UtilClass } from '../../common/util/util';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  isError: boolean = false;
  public static _REGION = environment.region;

  public static _IDENTITY_POOL_ID = environment.identityPoolId;
  public static _USER_POOL_ID = environment.userPoolId;
  public static _CLIENT_ID = environment.clientId;

  public static _POOL_DATA: any = {
    UserPoolId: LoginComponent._USER_POOL_ID,
    ClientId: LoginComponent._CLIENT_ID
  };

  public cognitoCreds: AWS.CognitoIdentityCredentials;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private utilClass: UtilClass,
    private headerService: HeaderService
  ) {
    this.loginForm = new LoginForm(this.fb).loginForm();
    // this.utilClass.isAuthenticated(this);
  }

  ngOnInit() {
  }

  login() {
    this.onLoginSuccess();

    /*  this.isError = false;
     console.log("FORM GROUP", this.loginForm.getRawValue())
     let user: any = this.loginForm.getRawValue();
     console.log("UserLoginService: starting the authentication");
 
     let authenticationData = {
       Username: user.userName,
       Password: user.password,
     };
     let authenticationDetails = new AuthenticationDetails(authenticationData);
 
     console.log("UserLoginService: Params set...Authenticating the user");
     let cognitoUser = this.utilClass.getCognitoUser(user.userName);
     console.log("UserLoginService: config is " + AWS.config);
     cognitoUser.authenticateUser(authenticationDetails, {
       onSuccess: result => this.onLoginSuccess(result),
       onFailure: err => this.onLoginError(err)
     }); */


  }

  private onLoginSuccess(session?: CognitoUserSession) {

    // let token: any = this.utilClass.getCurrentUser().getUsername();
    // console.log("NAME", token);

    this.headerService.userName = "Jaya Priya";
    console.log("In authenticateUser onSuccess callback");
    this.router.navigate(['/products/manage']);

  }

  private onLoginError(err) {
    this.cognitoCallback(err.message, null);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
      this.isError = true;
      this.errorMessage = message;
      console.log("result: " + this.errorMessage);
      if (this.errorMessage === 'User is not confirmed.') {
        console.log("redirecting");
        this.router.navigate(['/login']);
      } else if (this.errorMessage === 'User needs to set password.') {
        console.log("redirecting to set new password");
        this.router.navigate(['/signup']);
      }
    } else { //success
      this.router.navigate(['/products/manage']);
    }
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigate(['/products/manage']);
    }
  }

}

export interface Callback {
  callback(): void;

  callbackWithParam(result: any): void;
}

export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;

  handleMFAStep?(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void;
}

export interface ChallengeParameters {
  CODE_DELIVERY_DELIVERY_MEDIUM: string;

  CODE_DELIVERY_DESTINATION: string;
}



