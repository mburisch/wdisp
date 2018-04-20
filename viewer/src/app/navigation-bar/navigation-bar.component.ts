import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(readonly imageService: ImageService) {
  }

  ngOnInit() {
  }

  removeImages() {
    this.imageService.deleteImages();
  }

}
