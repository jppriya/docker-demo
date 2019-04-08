import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpResponse, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {
        this.loaderService.showLoader = true;

    }
    _currentRequests: number = 0;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        this._currentRequests++;
        this.loaderService.showLoader = true;

        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this._currentRequests--;
                if (this._currentRequests === 0) {
                    this.onEnd();
                }
            }
        }, (err: any) => {
            this._currentRequests--;
            if (this._currentRequests === 0) {
                this.onEnd();
            }
        }
        ));
    }


    private onEnd(): void {
        this.loaderService.showLoader = false;
    }

}