import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ImageService } from './image.service';
import { AppRoutingModule } from './/app-routing.module';
import { ImageDetailViewComponent } from './image-detail-view/image-detail-view.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { ImageRenderingService } from './image-rendering.service';
import { CanvasResizeDirective } from './canvas-resize.directive';


@NgModule({
  declarations: [
    AppComponent,
    ImageViewComponent,
    ImageDetailViewComponent,
    NavigationBarComponent,
    OverviewComponent,
    CanvasResizeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ImageService,
    ImageRenderingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
