import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../../interfaces/report';
import { MaterialEditFormComponent, MaterialFormComponent, MaterialMenuComponent } from '../../report/material/material.component';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  @Input("report") report: any;
  isSubmitting: boolean = false;
  step: number = 1;
  materials: Material[] = [];

  note: FormControl = new FormControl("");

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private router: ActivatedRoute,
    private sheet: MatBottomSheet,
    private reportService: ReportService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.note.setValue(this.report.Note);
    this.materials = this.report.Material;
  }

  addMaterial() {
    this.isSubmitting = true;
    this.reportService.editMaterialReport({
      Id: this.report.Id,
      CodeProjectId: this.report.CodeProjectId,
      CreatedBy: this.report.CreatedBy,
      Materials: this.materials,
      Note: this.note.value.toString()
    }).subscribe(responseData => {
      this.isSubmitting = false;
      this.backToProject();
    }, error => {
      this.snackBar.open(error.message, "Close", {
        duration: 2000,
        panelClass: 'snack-bar'
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
      } else if (data == "delete") {
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
