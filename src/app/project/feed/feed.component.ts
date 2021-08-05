import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FeedService } from '../../services/feed.service';
import * as global from '../../global';
import { SocketService } from '../../services/socket.service';
import { ApprovalService } from '../../services/approval.service';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { ImageViewWrapperDirective } from '../../image-view-wrapper/image-view-wrapper.directive';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../../services/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feeds: any[] = [];
  global: any = global;
  position: number = 0;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: ActivatedRoute,
    private route: Router,
    private cookieService: CookieService,
    private feedService: FeedService,
    private socketService: SocketService,
    private approvalService: ApprovalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;
  closeImageView: Subscription;

  ngOnInit(): void {
    this.position = this.authService.getInfo().Position;

    if (!this.cookieService.get("projectId")) {
      this.route.navigate(["/"]);
    }

    setTimeout(() => {
      this.fetchFeeds()
    }, 500)

    this.socketService.socket.on("deleteProject", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {

      }
    })

    this.socketService.socket.on("newToolReport", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newMaterialReport", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newProgressReport", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newWeatherReport", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newRFI", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("deleteProject", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {
        this.route.navigate(["/"]);
      }
    })

    this.socketService.socket.on("deleteFeed", (data: any) => {
      if (data.projectId == parseInt(this.cookieService.get("projectId").toString())) {
        const index = this.feeds.findIndex(x => x.Id == data.reportId);
        this.feeds.splice(index, 1);
      }
    })

    this.socketService.socket.on("newApproval", (data: any) => {
      const index = this.feeds.findIndex(x => x.Id == data.CodeReportId);
      if (index > -1) {
        if (data.Approval == 0) {
          (this.feeds[index].CodeReportApprovalComment as any[]).unshift(data);
        } else {
          (this.feeds[index].CodeReportApproval as any[]).push(data);
        }

      }
    })

    this.socketService.socket.on("newAnswer", (data: any) => {
      const index = this.feeds.findIndex(x => x.Id == data.RequestForInformation.CodeReportId);
      if (index > -1) {
        (this.feeds[index].RequestForInformation.RequestForInformationAnswer as any[]).unshift(data);
      }
    })

    this.socketService.socket.on("deleteApproval", (data: any) => {
      const index = this.feeds.findIndex(x => x.Id == data.CodeReportId);
      if (index > -1) {
        const approvalIndex = (this.feeds[index].CodeReportApproval as any[]).findIndex(x => x.Id == data.Id);
        if (approvalIndex > -1) {
          (this.feeds[index].CodeReportApproval as any[]).splice(approvalIndex, 1);
        }

        const commentIndex = (this.feeds[index].CodeReportApprovalComment as any[]).findIndex(x => x.Id == data.Id);
        if (commentIndex > -1) {
          this.approvalService.getCommentsDisplay(this.feeds[index].Id).subscribe((data: any[]) => {
            (this.feeds[index].CodeReportApprovalComment as any[]) = data;
          })
        }
      }
    })
  }

  openMenu() {
    this.bottomSheet.open(FeedMenuComponent, {
      data: parseInt(this.cookieService.get("projectId").toString())
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

  viewImage(imageUrl: any) {
    const imageComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
    const imageContainerRef = this.imageViewHost.viewContainerRef;
    imageContainerRef.clear();

    const componentRef = imageContainerRef.createComponent(imageComponentFactory);
    componentRef.instance.imageUrl = {
      image: global.url + "/img/" + imageUrl.ImageUrl,
      title: imageUrl.Name
    }
      
    this.closeImageView = componentRef.instance.close.subscribe(() => {
      this.closeImageView.unsubscribe();
      imageContainerRef.clear();
    })
  }

  selector: string = '.feed-container';

  deleteFeed(feed: number) {
    this.dialog.open(FeedDeleteComponent, {
      disableClose: false,
      data: feed
    })
  }

  editFeed(feed: any) {
    this.route.navigate(["/Edit/" + feed.Id])
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

@Component({
  selector: 'feed-delete',
  templateUrl: 'feed-delete.html'
})

export class FeedDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<FeedDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) { }
  confirmationText: string = Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString();
  confirmation: string = "";
  isSubmitting: boolean = false;

  submit() {
    this.isSubmitting = true;
    this.reportService.deleteReport(this.data).subscribe(data => {
      this.dialogRef.close({ error: false })
    }, error => {
      this.snackBar.open(error.message, "Close");
      this.isSubmitting = false;
    })
  }
}
