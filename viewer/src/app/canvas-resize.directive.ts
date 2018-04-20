import { Directive, AfterViewInit, OnDestroy } from '@angular/core';
import { ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';

type Size = { width: number, height: number };

@Directive({
  selector: '[appCanvasResize]'
})
export class CanvasResizeDirective implements AfterViewInit, OnDestroy {

  private size$: Observable<Size>;
  private subscription: Subscription;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  constructor(private element: ElementRef) {
    this.size$ = Observable.timer(1, 100)
      .map(idx => this.element.nativeElement.getBoundingClientRect())
      .map(r => ({ width: r.width, height: r.height }))
      .distinctUntilChanged((s1, s2) => (s1.width === s2.width) && (s1.height === s2.height));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.subscription = this.size$.subscribe(s => this.resizeCanvas(s));
  }

  resizeCanvas(size: Size) {
    this.element.nativeElement.width = size.width;
    this.element.nativeElement.height = size.height;
    this.resize.emit(size);
  }



}
