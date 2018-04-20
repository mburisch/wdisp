import { TestBed, inject } from '@angular/core/testing';

import { ImageRenderingService } from './image-rendering.service';

describe('ImageRenderingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageRenderingService]
    });
  });

  it('should be created', inject([ImageRenderingService], (service: ImageRenderingService) => {
    expect(service).toBeTruthy();
  }));
});
