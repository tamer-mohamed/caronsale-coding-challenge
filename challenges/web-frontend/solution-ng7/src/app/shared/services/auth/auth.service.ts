import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import * as sha512 from "js-sha512";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  validateUser(
    username: string,
    password: string
  ): Observable<{ token: string }> {
    const hashedPassword = this._hashPasswordWithCycles(
      password,
      environment.authHashCycles
    );

    return this.http
      .put<{ token: string }>(`authentication/${username}`, {
        password: hashedPassword,
      })
      .pipe(
        tap((res) => this.saveToken(res.token)),
        catchError(this.handleError)
      );
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");

    return !!token;
  }

   _hashPasswordWithCycles(password: string, cycles: number): string {
    let hash = `${password}`;

    for (let i = 0; i < cycles; i++) {
      hash = sha512.sha512(hash);
    }

    return hash;
  }

  // TODO: to move to core-network service
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(error.error.message);
  }
}
