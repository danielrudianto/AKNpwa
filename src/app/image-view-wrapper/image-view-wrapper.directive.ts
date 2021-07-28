import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector:'[imageView]'
})

export class ImageViewWrapperDirective{
  constructor(
    public viewContainerRef: ViewContainerRef
  ){ }
}
