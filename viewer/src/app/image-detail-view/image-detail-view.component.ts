import { Component, Input, OnInit, AfterViewInit, } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

import { ImageService } from '../image.service';
import { Image } from '../image';
import { ImageRenderingService } from '../image-rendering.service';


type Rect = { x: number, y: number, width: number, height: number };

@Component({
  selector: 'app-image-detail-view',
  templateUrl: './image-detail-view.component.html',
  styleUrls: ['./image-detail-view.component.css']
})
export class ImageDetailViewComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasElement: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  _image: Image;

  private scale: number;

  
  constructor(private renderingService: ImageRenderingService) {
  }

  ngOnInit() {
    this.resetView();
  }

  ngAfterViewInit() {
    this.canvas = this.canvasElement.nativeElement;
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    this.drawImage();
  }

  
  @Input() set image(im: Image) {
    this._image = im;
    this.resetView();
    this.drawImage();
  }

  get image() {
    return this._image;
  }


  resetView() {
    this.scale = 1;
  }


  async drawImage() {
    if (this.context == null)
      return;

    const bitmap = await this.renderingService.createImageBitmap(this.context, this.image);

    const sx = this.canvas.width / bitmap.width;
    const sy = this.canvas.height / bitmap.height;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (sx > sy) {
      const w = bitmap.width * sy;
      this.context.drawImage(bitmap, (this.canvas.width - w) / 2, 0, w, this.canvas.height);
    }
    else {
      const h = bitmap.height * sx;
      this.context.drawImage(bitmap, 0, (this.canvas.height - h) / 2, this.canvas.width, bitmap.height * sx);
    }
  }

  /*
  @HostListener('wheel', ["$event"])
  onsMouseOver(event: WheelEvent) {
    this.scale = Math.max(Math.min(this.scale - event.deltaY / 2000, 4), 0.25));
    this.drawImage();
  }
  */
}

