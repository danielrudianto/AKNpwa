import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(
    private readonly updates: SwUpdate,
    private dialog: MatDialog
  ) {
    this.updates.available.subscribe(event => {
      this.doAppUpdate();
    });
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
