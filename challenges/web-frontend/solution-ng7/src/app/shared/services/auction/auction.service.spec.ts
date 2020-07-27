import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";

import { Auction, AuctionService } from "./auction.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { AuthService } from "../auth/auth.service";

const currentUserId = "a@a.com";

describe("AuctionService", () => {
  const authServiceStub = { getCurrentUserId: () => currentUserId };
  let auctionService: AuctionService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuctionService,
        { provide: AuthService, useValue: authServiceStub },
      ],
    });

    auctionService = TestBed.get(AuctionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it("should be created", () => {
    const service: AuctionService = TestBed.get(AuctionService);
    expect(service).toBeTruthy();
  });

  it("should get running auctions", () => {
    const auctionsMock = [{ uuid: "123" }, { uuid: "1234" }];

    auctionService.getRunningAuctions().subscribe((res) => {
      expect(res).toEqual([
        {
          uuid: "123",
          details: {
            uuid: "123",
            associatedVehicle: {
              ez: "123",
            },
          },
        },
        {
          uuid: "1234",
          details: {
            uuid: "1234",
            associatedVehicle: {
              ez: "123",
            },
          },
        },
      ] as Partial<Auction[]>);
      // expect(.error.type).toBe("ERROR_LOADING_COUNTRIES");
    });

    httpMock
      .expectOne(`auction/salesman/${currentUserId}/_all/bidding-data`)
      .flush(auctionsMock);

    httpMock.expectOne(`auction/salesman/${currentUserId}/123`).flush({
      uuid: "123",
      associatedVehicle: {
        ez: "123",
      },
    });

    httpMock.expectOne(`auction/salesman/${currentUserId}/1234`).flush({
      uuid: "1234",
      associatedVehicle: {
        ez: "123",
      },
    });
  });

  it("should get refetch on interval basis", fakeAsync(() => {
    const auctionsMock = [{ uuid: "123" }, { uuid: "1234" }];

    auctionService.getRunningAuctions(3).subscribe((res) => {
      expect(res).toEqual([
        {
          uuid: "123",
          details: {
            uuid: "123",
            associatedVehicle: {
              ez: "123",
            },
          },
        },
        {
          uuid: "1234",
          details: {
            uuid: "1234",
            associatedVehicle: {
              ez: "123",
            },
          },
        },
      ] as Partial<Auction[]>);
      // expect(.error.type).toBe("ERROR_LOADING_COUNTRIES");
    });

    httpMock
      .expectOne(`auction/salesman/${currentUserId}/_all/bidding-data`)
      .flush(auctionsMock);

    httpMock.expectOne(`auction/salesman/${currentUserId}/123`).flush({
      uuid: "123",
      associatedVehicle: {
        ez: "123",
      },
    });

    httpMock.expectOne(`auction/salesman/${currentUserId}/1234`).flush({
      uuid: "1234",
      associatedVehicle: {
        ez: "123",
      },
    });

    tick(5);

    httpMock
      .expectOne(`auction/salesman/${currentUserId}/_all/bidding-data`)
      .flush(auctionsMock);

    httpMock.expectOne(`auction/salesman/${currentUserId}/123`).flush({
      uuid: "123",
      associatedVehicle: {
        ez: "123",
      },
    });

    httpMock.expectOne(`auction/salesman/${currentUserId}/1234`).flush({
      uuid: "1234",
      associatedVehicle: {
        ez: "123",
      },
    });

    discardPeriodicTasks();
  }));
});
