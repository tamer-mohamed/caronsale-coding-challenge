import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const userId = this.authService.getCurrentUserId();
    let authHeaders = {};

    // TODO: add a way to prevent adding authToken to the unprotected endpoints like `/authentication`
    if (!!token) {
      authHeaders = {
        AuthToken: token,
        UserId: userId,
      };
    }

    const apiReq = req.clone({
      url: `${environment.baseUrl}/${req.url}`,
      setHeaders: authHeaders,
    });

    return next.handle(apiReq);
  }
}
