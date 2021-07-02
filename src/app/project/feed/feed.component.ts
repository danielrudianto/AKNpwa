import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (this.router.snapshot.params.projectId == undefined) {
      this.route.navigate(["/"]);
    }
  }

  openMenu() {
    this.bottomSheet.open(FeedMenuComponent, {
      data: this.router.snapshot.params.projectId
    });
  }

  backToMain() {
    this.route.navigate(["/"]);
  }

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
