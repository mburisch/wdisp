import { Injectable } from '@angular/core';

import { Image } from './image';
import { Observable } from 'rxjs/Observable';
import { setDisplayData } from './image-renderer';



@Injectable()
export class ImageRenderingService {



  constructor() {
  }
  

  async createImageBitmap(context: CanvasRenderingContext2D, image: Image): Promise<ImageBitmap> {
    const im = context.createImageData(image.width, image.height);
    setDisplayData(im.data, image, image.info.values.vmin, image.info.values.vmax, [0, 1, 2]);
    const bm = await createImageBitmap(im);
    return bm;
  }
}

