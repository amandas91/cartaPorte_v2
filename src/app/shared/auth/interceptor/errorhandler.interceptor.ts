import { Injectable } from '@angular/core';
import { AppEventManager } from 'app/shared/service/event-manager.service';
import { EventWithContent } from 'app/shared/models/event-with-content.model';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private eventManager: AppEventManager) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (!(err.status === 401 && (err.message === '' || (err.url && err.url.includes('api/account'))))) {
          this.eventManager.broadcast(new EventWithContent('operadorApp.httpError', err));
        }
      })
    );
  }
}
