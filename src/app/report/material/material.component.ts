import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Material } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materials: Material[] = [];
  isSubmitting: boolean = false;
  step: number = 1;

  note: FormControl = new FormControl("");

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private router: ActivatedRoute,
    private sheet: MatBottomSheet,
    private reportService: ReportService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  addMaterial() {
    this.isSubmitting = true;
    this.reportService.submitMaterialReport({
      CodeProjectId: parseInt(this.cookieService.get("projectId")),
      CreatedBy: this.authService.getEmail(),
      Materials: this.materials,
      Note: this.note.value.toString()
    }).subscribe(responseData => {
      this.isSubmitting = false;
      this.route.navigate(["/Report/Success"]);
    }, error => {
        this.snackBar.open(error.message, "Close", {
          duration: 2000,
          panelClass:'snack-bar'
        })
      this.isSubmitting = false
    })
  }

  backToProject() {
    this.route.navigate(["/Project/Feed/"])
  }

  openAddMaterialForm() {
    const dialog = this.dialog.open(MaterialFormComponent, {
      disableClose: true
    })

    dialog.afterClosed().subscribe((data) => {
      if (data.name != undefined && data.unit != undefined && data.quantity != undefined && data.unit != undefined) {
        this.materials.push({
          Name: data.name,
          Quantity: parseFloat(data.quantity),
          Description: data.description,
          Unit: data.unit,
          Status: 1
        })
      }
    })
  }

  onLongPress(material: Material) {
    const sheet = this.sheet.open(MaterialMenuComponent, {
      disableClose: true
    })

    sheet.afterDismissed().subscribe(data => {
      if (data == "edit") {
        const dialog = this.dialog.open(MaterialEditFormComponent, {
          disableClose: true,
          data: material
        })

        dialog.afterClosed().subscribe(data => {
          const materialEdited = data as Material;
          this.materials[this.materials.indexOf(material)].Name = materialEdited.Name;
          this.materials[this.materials.indexOf(material)].Description = materialEdited.Description;
          this.materials[this.materials.indexOf(material)].Quantity = materialEdited.Quantity;
          this.materials[this.materials.indexOf(material)].Unit = materialEdited.Unit;
        })
      } else if(data == "delete") {
        this.materials.splice(this.materials.indexOf(material), 1);
      }
    })
  }

  onChange(material: Material) {
    const status = this.materials[this.materials.indexOf(material)].Status;
    this.materials[this.materials.indexOf(material)].Status = status == 1 ? 2 : 1;
  }

  next() { this.step++; }
  prev() { this.step--; }
}

@Component({
  selector: 'material-form',
  templateUrl: 'material-form.html'
})
export class MaterialFormComponent {
  constructor(
    private dialogRef: MatDialogRef<MaterialFormComponent>
  ) { }

  materialForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    quantity: new FormControl(0, [Validators.min(0.01), Validators.required]),
    unit: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  })

  submitForm() {
    this.dialogRef.close({
      name: this.materialForm.controls.name.value,
      quantity: parseFloat(this.materialForm.controls.quantity.value),
      unit: this.materialForm.controls.unit.value,
      description: this.materialForm.controls.description.value
    })
  }
}

@Component({
  selector: 'material-edit-form',
  templateUrl:'material-edit-form.html'
})
export class MaterialEditFormComponent {
  constructor(
    private dialogRef: MatDialogRef<MaterialEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Material
  ) { }

  materialForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.Name, Validators.required),
    quantity: new FormControl(this.data.Quantity, [Validators.min(0.01), Validators.required]),
    unit: new FormControl(this.data.Unit, Validators.required),
    description: new FormControl(this.data.Description, Validators.required)
  })

  submitForm() {
    this.dialogRef.close({
      Name: this.materialForm.controls.name.value,
      Quantity: parseFloat(this.materialForm.controls.quantity.value),
      Unit: this.materialForm.controls.unit.value,
      Description: this.materialForm.controls.description.value
    })
  }
}

@Component({
  selector: 'material-menu',
  templateUrl: 'material-menu.html'
})
export class MaterialMenuComponent {
  constructor(
    private sheetRef: MatBottomSheetRef
  ) { }

  onDeleteItem() {
    this.sheetRef.dismiss("delete");
  }

  onEditItem() {
    this.sheetRef.dismiss("edit");
  }

  onCloseMenu() {
    this.sheetRef.dismiss(null);
  }
}
