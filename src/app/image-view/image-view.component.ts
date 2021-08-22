import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import * as global from '../global';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  @Input() imageUrl: object;
  @Output() close = new EventEmitter();
  imageUrls: Array<object> = [];

  constructor(
    private http: HttpClient,
    private _FileSaverService: FileSaverService
  ) { }

  ngOnInit(): void {
    this.imageUrls = [this.imageUrl];
  }

  onClose() {
    this.close.emit();
  }

  downloadFile() {
    const imageUrlArray = (this.imageUrl as any).image.split("/");
    console.log(imageUrlArray);
    this.http.get(global.url + "/download/img/" + imageUrlArray[4] + "/" + imageUrlArray[5], {
      responseType: 'blob'
    }).subscribe(data => {
      this._FileSaverService.save((<any>data), imageUrlArray[5]);
    })
  }

  doNothing() { }
}
