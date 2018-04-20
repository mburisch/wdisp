import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ImageService } from '../image.service';
import { Image } from '../image';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit, OnDestroy, AfterViewInit {

  image$: Observable<Image>;
  image: Image

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private imageService: ImageService) {
  }

  ngOnInit() {
    let name$ = this.route.paramMap.map(p => p.get("name"));
    this.image$ = name$.switchMap(name => this.imageService.getImage(name))
    this.subscription = this.image$.subscribe(im => this.image = im);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    
  }


}
