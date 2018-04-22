import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { ImageRenderingService } from '../image-rendering.service';
import { Image, ImageInfo } from '../image';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(readonly imageService: ImageService, private imageRendering: ImageRenderingService) {
  }

  ngOnInit() {
    
  }

  previewUrl(image: ImageInfo): string {
    return this.imageService.baseUrl + "/preview/" + image.name + "?" + image.time.getTime();
  }

  deleteImage(image: ImageInfo) {
    this.imageService.deleteImage(image.name);
  }

}
