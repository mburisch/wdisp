import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import { retryWhen } from "rxjs/operators"


import { ImageInfo, Image } from "./image"
import { ImageRenderingService } from './image-rendering.service';
import { UnaryFunction } from 'rxjs/interfaces';


function webSocketObservable(url): Observable<MessageEvent> {
  const observable = Observable.create(observer => {
    const socket = new WebSocket(url);
    socket.onmessage = msg => observer.next(msg);
    socket.onerror = () => observer.error("WebSocket error");
    //socket.onclose = () => observer.complete();
    socket.onclose = () => observer.error("Closed");

    return function unsubscribe() {
      socket.close();
    };
  });

  return observable;
}


@Injectable()
export class ImageService {
  readonly baseUrl: string = "/api"
  readonly wsUrl: string = "ws://" + location.host + "/api/image_stream"

  readonly images$: BehaviorSubject<ImageInfo[]>
  private images: ImageInfo[] = [];

  private socket$: Observable<MessageEvent>;


  constructor(private imageRendering: ImageRenderingService, private http: HttpClient) {
    this.images$ = new BehaviorSubject<ImageInfo[]>([]);
    this.images$.subscribe(images => this.images = images);


    this.socket$ = webSocketObservable(this.wsUrl).pipe(this.retryOp<MessageEvent>());
    this.socket$.subscribe(msg => this.onImageMessage(msg));
  }

  private retryOp<T>(): UnaryFunction<Observable<any>, Observable<T>> {
    return retryWhen(error => error.switchMap((error) => Observable.of(error).delay(1000)));
  }


  private addImage(info: ImageInfo) {
    const images = this.images.filter(im => im.name !== info.name);
    images.push(info)
    this.images$.next(images);
  }

  private removeImage(name: string) {
    const images = this.images.filter(im => im.name !== name);
    this.images$.next(images);
  }

  private removeAllImages() {
    this.images$.next([]);
  }


  private onImageMessage(msg: MessageEvent) {
    const data = JSON.parse(msg.data);
    if (data.type === "add_image") {
      data.info.time = new Date(data.info.time);
      this.addImage(data.info as ImageInfo);
    }
    else if (data.type == "remove_image") {
      this.removeImage(data.name);
    }
    else if (data.type == "remove_all_images") {
      this.removeAllImages();
    }
  }




  getImageInfo(name: string): Observable<ImageInfo> {
    const info$ = this.images$.map(x => x.find(x => x.name == name));
    return info$;
  }
  
  getImageData(name: string): Observable<ArrayBuffer> {
    return this.http.get(this.baseUrl + "/image/" + name, { responseType: "arraybuffer" }).pipe(this.retryOp<ArrayBuffer>());
  }

  async deleteImage(name: string) {
    await this.http.delete(this.baseUrl + "/image/" + name).toPromise();
  }


  async deleteImages() {
    await this.http.delete(this.baseUrl + "/images").toPromise();
  }


  async continueExecution() {
    await this.http.post(this.baseUrl + "/wait", {}).toPromise();
  }

  getImage(name: string): Observable<Image> {
    const func = info => {
      if (info)
        return this.getImageData(info.name).map(data => new Image(info, data));
      else
        return Observable.of(null);
    };

    let info$ = this.images$.map(x => x.find(x => x.name == name));
    let data$ = info$.switchMap(func);
    return data$;
  }
}
