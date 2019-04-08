import { UtilClass } from './../common/util/util';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private utilClass: UtilClass,
        private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const currentUser = this.utilClass.getCurrentUser();
        if (!!currentUser) {

            return currentUser.getSession((err, session) => {
                if (session.isValid) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false
                }
            });
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const currentUser = this.utilClass.getCurrentUser();
        if (!!currentUser) {
            return currentUser.getSession((err, session) => {
                if (session.isValid) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false
                }
            });
        } else {
            this.router.navigate(['/login']);
            return false

        }
    }
}