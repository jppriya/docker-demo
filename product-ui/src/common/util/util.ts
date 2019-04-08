import { Injectable } from '@angular/core';
import { Callback } from '../../components/login/login.component';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
@Injectable()
export class UtilClass {
    getIdToken(): void {

        if (this.getCurrentUser() != null) {
            return this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    return null;
                }
                else {
                    if (session.isValid()) {
                        return session.getIdToken().jwtToken;
                    } else {
                        console.log("CognitoUtil: Got the id token, but the session isn't valid");
                    }
                }
            });
        }
        else
            return null;
    }

    getCurrentUser() {
        return this.getUserPool().getCurrentUser();
    }

    getUserPool() {

        let poolData = {
            UserPoolId: environment.userPoolId, // Your user pool id here
            ClientId: environment.clientId// Your client id here
        };
        return new CognitoUserPool(poolData);

    }

    getCognitoUser(userName: string) {
        let userData = {
            Username: userName,
            Pool: this.getUserPool()
        };
        return new CognitoUser(userData);
    }

    isAuthenticated(callback: any) {

        let cognitoUser = this.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    callback.isLoggedIn(err, false);
                }
                else {
                    console.log("UserLoginService: Session is " + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log("UserLoginService: can't retrieve the current user");
            callback.isLoggedIn("Can't retrieve the CurrentUser", false);
        }
    }

}