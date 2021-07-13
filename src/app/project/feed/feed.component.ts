import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FeedService } from '../../services/feed.service';
import * as global from '../../global';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feeds: any[] = [];
  global: any = global;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: ActivatedRoute,
    private route: Router,
    private cookieService: CookieService,
    private feedService: FeedService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    if (!this.cookieService.get("projectId")) {
      this.route.navigate(["/"]);
    }

    this.fetchFeeds();

    this.socketService.socket.on("newToolReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newMaterialReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newProgressReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newWeatherReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newRFI", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("deleteProject", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.route.navigate(["/"]);
      }
    })
  }

  openMenu() {
    this.bottomSheet.open(FeedMenuComponent, {
      data: this.router.snapshot.params.projectId
    });
  }

  fetchFeeds() {
    this.feedService.getFeeds(parseInt(this.cookieService.get("projectId")), this.feeds.length).subscribe(data => {
      data.forEach(datum => {
        this.feeds.push(datum);
      })
    })
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 }
  };

  onScroll() {
    console.log('scroll');
    this.fetchFeeds()
  }

  viewImage(url: string) {

  }

  selector: string = '.feed-container';

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
