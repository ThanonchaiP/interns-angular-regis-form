import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  responseCache = new Map();
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.canCache(request)) {
      return next.handle(request);
    }
    const cache = this.responseCache.get(request.urlWithParams);
    if (cache) {
      return of(cache);
    }
    return next.handle(request).pipe(
      tap((response) => {
        this.responseCache.set(request.urlWithParams, response);
      })
    );
  }

  canCache(request: HttpRequest<unknown>): boolean {
    return (
      request.urlWithParams.includes('/provinces') ||
      request.urlWithParams.includes('/genders') ||
      request.urlWithParams.includes('/races') ||
      request.urlWithParams.includes('/shirt_sizes')
    );
  }
}
