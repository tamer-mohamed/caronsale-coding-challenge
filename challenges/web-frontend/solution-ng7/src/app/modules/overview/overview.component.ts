import { Component, OnInit } from "@angular/core";
import {
  Auction,
  AuctionDetails,
  AuctionService,
} from "../../shared/services/auction/auction.service";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.less"],
})
export class OverviewComponent implements OnInit {
  auctions: Auction[] = [];
  loading = false;

  constructor(private auctionService: AuctionService) {}

  ngOnInit() {
    this.loading = true;
    this.auctionService.getRunningAuctions().subscribe(
      (res) => {
        this.auctions = res;
      },
      () => {
        // TODO: error handling
      },
      () => {
        this.loading = false;
      }
    );
  }
}
