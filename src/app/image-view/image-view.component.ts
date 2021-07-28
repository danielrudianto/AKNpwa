import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  @Input() imageUrl: object;
  @Output() close = new EventEmitter();
  imageUrls: Array<object> = [];

  constructor() { }

  ngOnInit(): void {
    this.imageUrls = [this.imageUrl];
  }

  onClose() {
    this.close.emit();
  }

  doNothing() { }
}
