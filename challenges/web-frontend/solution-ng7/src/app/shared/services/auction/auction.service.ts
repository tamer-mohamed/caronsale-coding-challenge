import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, concatMap, expand, mergeMap, tap } from "rxjs/operators";
import { forkJoin, Observable, throwError, timer } from "rxjs";
import { AuthService } from "../auth/auth.service";

export interface Auction {
  amIHighestBidder: boolean;
  biddingAgentValue: string;
  currentHighestBidValue: number;
  endingTime: string;
  instantPurchasePossibleUntil: string;
  isMinAskReached: boolean;
  minimumRequiredAsk: number;
  numBids: number;
  remainingTimeForInstantPurchaseInSeconds: number;
  remainingTimeInSeconds: number;
  state: number;
  uuid: string;

  details?: AuctionDetails;
}

export interface AuctionDetails {
  uuid: string;
  associatedVehicle: {
    ez: string;
    mileageInKm: number;
    fuelType: number;
    transmission: number;
    vehicleImages: { url: string }[];
  };
}

@Injectable({
  providedIn: "root",
})
export class AuctionService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getRunningAuctions(intervalInSec = 20000): Observable<Auction[]> {
    const userId = this.authService.getCurrentUserId();

    const poll$ = this.httpClient
      .get<Auction[]>(`auction/salesman/${userId}/_all/bidding-data`)
      .pipe(
        mergeMap(
          (response) =>
            forkJoin(response.map((r) => this.getAuctionById(r.uuid))),
          (auctionList, auctionDetails) => {
            return auctionList.map((auction) => ({
              ...auction,
              details: auctionDetails.find(
                (details) => details.uuid === auction.uuid
              ),
            }));
          }
        ),
        tap((res) => res),
        catchError(this.handleError)
      );

    return poll$.pipe(
      expand((_) => timer(intervalInSec).pipe(concatMap((_) => poll$)))
    );
  }

  getAuctionById(auctionId: string) {
    const userId = this.authService.getCurrentUserId();

    return this.httpClient.get<AuctionDetails>(
      `auction/salesman/${userId}/${auctionId}`
    );
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
