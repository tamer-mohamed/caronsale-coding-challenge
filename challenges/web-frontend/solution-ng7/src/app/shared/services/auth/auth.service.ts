import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import * as sha512 from "js-sha512";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../../../environments/environment";

export interface AuthResponse {
  token: string;
  userId: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  validateUser(username: string, password: string): Observable<AuthResponse> {
    const hashedPassword = this._hashPasswordWithCycles(
      password,
      environment.authHashCycles
    );

    return this.http
      .put<AuthResponse>(`authentication/${username}`, {
        password: hashedPassword,
      })
      .pipe(
        tap((res) => this.saveUserInfo(res.userId, res.token)),
        catchError(this.handleError)
      );
  }

  saveUserInfo(userId: string, token: string) {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getCurrentUserId() {
    return localStorage.getItem("userId");
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

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

    return throwError(
      error.error ? error.error.message : "Something went wrong"
    );
  }
}
