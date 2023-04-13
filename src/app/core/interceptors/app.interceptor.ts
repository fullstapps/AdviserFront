import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqModified;

    const { url } = req;
    const headers: any = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('adviser.token');
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
    reqModified = req.clone({
      url: API_URL + url,
      setHeaders: headers,
    });
    return this._continueRequest(reqModified, next);
  }
  private _continueRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => this._catchError(API_URL, req, err)),
      map((response: any) => {
        return response;
      })
    );
  }

  private _catchError(server: string, req: HttpRequest<any>, error: any) {
    return throwError(error);
  }
}
