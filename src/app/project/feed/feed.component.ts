import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: ActivatedRoute,
    private route: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (!this.cookieService.get("projectId")) {
      this.route.navigate(["/"]);
    }
  }

  openMenu() {
    this.bottomSheet.open(FeedMenuComponent, {
      data: this.router.snapshot.params.projectId
    });
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 }
  };

}

@Component({
  selector: 'menu-sheet',
  templateUrl: 'menu-sheet.html'
})
export class FeedMenuComponent {
  constructor(
    private bottomSheet: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number
  ) {}

  closeBottomSheet() {
    this.bottomSheet.dismiss();
  }
}
