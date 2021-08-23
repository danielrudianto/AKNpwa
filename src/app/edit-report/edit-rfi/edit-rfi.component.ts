import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageViewWrapperDirective } from '../../image-view-wrapper/image-view-wrapper.directive';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import * as global from '../../global';

@Component({
  selector: 'app-edit-rfi',
  templateUrl: './edit-rfi.component.html',
  styleUrls: ['./edit-rfi.component.css']
})
export class EditRfiComponent implements OnInit {
  global: any = global;

  @Input("report") report: any;
  isSubmitting: boolean = false;
  documentations: any[] = [];
  deletedDocumentations: any[] = [];
  newDocumentations: any[] = [];

  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;
  closeImageView: Subscription;

  constructor(
    private route: Router,
    private authService: AuthService,
    private reportService: ReportService,
    private snackBar: MatSnackBar,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  rfiForm: FormGroup = new FormGroup({
    Header: new FormControl("", Validators.required),
    AddressedFor: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required)
  })

  retrieveDocumentation(y: any) {
    this.deletedDocumentations.splice(this.deletedDocumentations.findIndex(x => x.Id == y.Id), 1);
    this.documentations.filter(x => x.Id == y.Id)[0].IsDelete = false;
  }

  removeDocumentation(i: number) {
    this.deletedDocumentations.push(this.documentations[i]);
    this.documentations[i].IsDelete = true;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.newDocumentations.push(event.target.files[0]);
    }
  }

  removeNewDocumentation(i: number) {
    this.newDocumentations.splice(i, 1);
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

  ngOnInit(): void {
    this.rfiForm.setValue(
      {
        Header: this.report.RequestForInformation.Header,
        AddressedFor: this.report.RequestForInformation.AddressedFor,
        Description: this.report.RequestForInformation.Description
      }
    )

    this.report.RequestForInformation.RequestForInformationDocument.forEach((document: any) => {
      this.documentations.push({
        Id: document.Id,
        name: document.Name,
        ImageUrl: document.ImageUrl,
        IsDelete: false
      })
    })
  }

  submitForm() {
    const uploadData = new FormData();
    const deleteId: any[] = [];

    this.isSubmitting = true;
    this.deletedDocumentations.forEach((x, indexD) => {
      deleteId.push(x.Id);
    })
    uploadData.append("Delete", JSON.stringify(deleteId));

    this.newDocumentations.forEach((documentation, index) => {
      uploadData.append("File[" + index + "]", documentation, documentation.name);
    })

    uploadData.append("Id", this.report.Id);
    uploadData.append("Header", this.rfiForm.controls.Header.value);
    uploadData.append("AddressedFor", this.rfiForm.controls.AddressedFor.value);
    uploadData.append("Description", this.rfiForm.controls.Description.value);

    uploadData.append("ProjectId", this.report.CodeProjectId);
    uploadData.append("Files", this.newDocumentations.length.toString());
    uploadData.append("DeleteFiles", this.deletedDocumentations.length.toString());

    this.reportService.editRFI(uploadData).subscribe(response => {
      this.route.navigate(["/Project/Feed"]);
    }, error => {
      this.snackBar.open(error.message, "Close");
      this.isSubmitting = false;
    });
  }

  openMediaPicker() {
    document.getElementById("cameraInput")!.click();
  }

}
