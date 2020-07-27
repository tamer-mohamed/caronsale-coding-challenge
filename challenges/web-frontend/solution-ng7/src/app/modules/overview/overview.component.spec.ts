import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OverviewComponent } from "./overview.component";
import { SharedModule } from "../shared/shared.module";
import { of, throwError } from "rxjs";
import {
  Auction,
  AuctionService,
} from "../../shared/services/auction/auction.service";

const auctionsMock = [
  {
    uuid: "123",
  },

  {
    uuid: "1234",
  },
];

const auctionServiceStub = {
  getRunningAuctions() {
    return of(auctionsMock);
  },
};

describe("OverviewComponent", () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      imports: [SharedModule],
      providers: [{ provide: AuctionService, useValue: auctionServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get the running auctions when the component is loaded", () => {
    component.ngOnInit();

    fixture.detectChanges();

    // using `as` here for the sake of simplicity
    // ideally we should have a proper data mock :)
    expect(component.auctions).toBe(auctionsMock as Auction[]);
  });
});
