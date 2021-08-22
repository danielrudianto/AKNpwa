import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as global from '../global';
import { AuthService } from '../services/auth.service';
import { FeedDeleteComponent } from '../project/feed/feed.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewWrapperDirective } from '../image-view-wrapper/image-view-wrapper.directive';
import { Subscription } from 'rxjs';
import { ImageViewComponent } from '../image-view/image-view.component';
import { SocketService } from '../services/socket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.css']
})
export class FeedDetailComponent implements OnInit {
  global: any = global;
  feed: any = null;
  position: number = 0;

  constructor(
    private router: ActivatedRoute,
    private feedService: FeedService,
    private route: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private socketService: SocketService,
    private cookieService: CookieService
  ) { }

  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;
  closeImageView: Subscription;

  id: number = 0;

  ngOnInit(): void {
    this.id = this.router.snapshot.params.feedId;
    this.feedService.getFeed(this.id).subscribe(data => {
      if (data == null) {
        this.route.navigate(["/"]);
      }

      this.feed = data;
    })

    this.position = this.authService.getInfo().Position;

    this.socketService.socket.on("deleteProject", (data: any) => {
      if (this.feed.projectId == data.projectId) {
        this.route.navigate(["/"]);
      }
    })

    this.socketService.socket.on("deleteFeed", (data: any) => {
      if (this.id == data.reportId) {
        this.cookieService.set("projectId", this.feed.projectId);
        this.route.navigate(["/Project/Feed"]);
      }
    })

    this.socketService.socket.on("newApproval", (data: any) => {
      if (data.CodeReportId == this.feed.Id) {
        if (data.Approval == 0) {
          (this.feed.CodeReportApprovalComment as any[]).unshift(data);
        } else {
          (this.feed.CodeReportApproval as any[]).push(data);
        }

      }
    })

    this.socketService.socket.on("newAnswer", (data: any) => {
      if (data.CodeReportId == this.feed.Id) {
        this.feed.RequestForInformation.RequestForInformationAnswer.unshift(data)
      }
    })

    this.socketService.socket.on("deleteApproval", (data: any) => {
      if (this.feed.Id == data.CodeReportId) {
        const approvalIndex = (this.feed.CodeReportApproval as any[]).findIndex(x => x.Id == data.Id);
        if (approvalIndex > -1) {
          (this.feed.CodeReportApproval as any[]).splice(approvalIndex, 1);
        }
      }
    })
  }

  deleteFeed(feed: number) {
    this.dialog.open(FeedDeleteComponent, {
      disableClose: false,
      data: feed
    })
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

}
