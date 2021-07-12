import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'media-picker',
  templateUrl: 'media-picker.html'
})
export class MediaPickerComponent {
  constructor(
    private sheetRef: MatBottomSheetRef
  ) { }

  onSelectPhoto() {
    this.sheetRef.dismiss("photo");
  }

  onSelectGallery() {
    this.sheetRef.dismiss("gallery");
  }

  onClose() {
    this.sheetRef.dismiss(null);
  }
}
