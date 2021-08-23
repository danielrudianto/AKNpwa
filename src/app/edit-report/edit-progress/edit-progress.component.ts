import { Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageViewWrapperDirective } from '../../image-view-wrapper/image-view-wrapper.directive';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import * as global from '../../global';

@Component({
  selector: 'app-edit-progress',
  templateUrl: './edit-progress.component.html',
  styleUrls: ['./edit-progress.component.css']
})
export class EditProgressComponent implements OnInit {
  global: any = global;

  @Input("report") report: any;
  documentations: any[] = [];
  newDocumentations: any[] = [];

  deletedDocumentations: any[] = [];

  progress: string = "";
  isSubmitting: boolean = false;

  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;
  closeImageView: Subscription;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private sheet: MatBottomSheet,
    private reportService: ReportService,
    private authService: AuthService,
    private snack: MatSnackBar,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  backToProject() {
    this.route.navigate(["/Project/Feed/" + this.router.snapshot.params.projectId]);
  }

  openMediaPicker() {
    document.getElementById("cameraInput")!.click();
  }

  onFileSelected(event: any) {
    const files = event.target.files[0] as File;
    this.newDocumentations.push(files as File);
  }

  retrieveDocumentation(y: any) {
    this.deletedDocumentations.splice(this.deletedDocumentations.findIndex(x => x.Id == y.Id), 1);
    this.documentations.filter(x => x.Id == y.Id)[0].IsDelete = false;
  }

  removeDocumentation(i: number) {
    this.deletedDocumentations.push(this.documentations[i]);
    this.documentations[i].IsDelete = true;
  }

  removeNewDocumentation(i: number) {
    this.newDocumentations.splice(i, 1);
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 }
  };

  ngOnInit(): void {
    this.progress = this.report.StatusReport.Status;
    this.report.StatusReport.StatusReportImage.forEach((x: any) => {
      this.documentations.push({
        Id: x.Id,
        name: x.Name,
        ImageUrl: x.ImageUrl
      })
    })
  }

  submitForm() {
    const uploadData = new FormData();
    this.newDocumentations.forEach((documentation, index) => {
      uploadData.append("File[" + index + "]", documentation, documentation.name);
    })

    const deleteId: any[] = [];
    this.deletedDocumentations.forEach((x, indexD) => {
      deleteId.push(x.Id);
    })
    uploadData.append("Delete", JSON.stringify(deleteId));

    uploadData.append("Progress", this.progress);
    uploadData.append("Files", this.newDocumentations.length.toString());
    uploadData.append("DeleteFiles", this.deletedDocumentations.length.toString());
    uploadData.append("ProjectId", this.report.CodeProjectId);
    uploadData.append("Id", this.report.Id);

    this.reportService.editProgressReport(uploadData).subscribe(response => {
      this.route.navigate(["/Project/Feed"]);
    }, error => {
      this.snack.open("Open", error.message);
    });
  }

  viewImage(i: number) {
    const imageComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
    const imageContainerRef = this.imageViewHost.viewContainerRef;
    imageContainerRef.clear();

    const componentRef = imageContainerRef.createComponent(imageComponentFactory);
    componentRef.instance.imageUrl = {
      image: global.url + "/img/" + this.documentations[i].ImageUrl,
      title: this.documentations[i].name
    }

    this.closeImageView = componentRef.instance.close.subscribe(() => {
      this.closeImageView.unsubscribe();
      imageContainerRef.clear();
    })
  }

}
