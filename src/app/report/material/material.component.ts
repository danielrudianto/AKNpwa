import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../../interfaces/report';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materials: Material[] = [];
  isSubmitting: boolean = false;

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  addMaterial() {
    this.isSubmitting = true;
  }

  backToProject() {
    this.route.navigate(["/Project/Feed/" + this.router.snapshot.params.projectId])
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
          Unit: data.unit
        })
      }
    })
  }


  openEditMaterialForm(material: Material) {
    this.dialog.open(MaterialEditFormComponent);
  }

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
      name: this.materialForm.controls.name.value,
      quantity: parseFloat(this.materialForm.controls.quantity.value),
      unit: this.materialForm.controls.unit.value,
      description: this.materialForm.controls.description.value
    })
  }
}
