import { Time } from "@angular/common/src/i18n/locale_data_api";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


export type ImageDataArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
export type ImageDataType = "int8" | "uint8" | "int16" | "uint16" | "int32" | "uint32" | "float32" | "float64";

function createTypedArray(buffer: ArrayBuffer, dataType: ImageDataType): ImageDataArray {
  switch (dataType) {
    case "int8":    return new Int8Array(buffer);
    case "uint8":   return new Uint8Array(buffer);
    case "int16":   return new Int16Array(buffer);
    case "uint16":  return new Uint16Array(buffer)
    case "int32":   return new Int32Array(buffer);
    case "uint32":  return new Uint32Array(buffer);
    case "float32": return new Float32Array(buffer);
    case "float64": return new Float64Array(buffer);
  }
  throw new Error("Invalid image data type");
}


export class ImageValueRange {
  readonly vmin: number;
  readonly vmax: number;
}


export interface ImageInfo {
  readonly id: number;
  readonly name: string;

  readonly width: number;
  readonly height: number;
  readonly channels: number;
  readonly dataType: ImageDataType;

  readonly values: ImageValueRange;

  readonly time: Date;
}


export interface ImageData {
  readonly id: number;
  readonly data: ImageDataArray;
}



export class Image {

  readonly info: ImageInfo;
  readonly data: ImageDataArray;


  constructor(info: ImageInfo, buffer: ArrayBuffer) {
    this.info = info;
    this.data = createTypedArray(buffer, this.info.dataType);
  }


  get id(): number {
    return this.info.id;
  }

  get name(): string {
    return this.info.name;
  }

  get width(): number {
    return this.info.width;
  }

  get height(): number {
    return this.info.height;
  }


  // Image data access
  index(x: number, y: number, channel: number) {
    const bpe = this.data.BYTES_PER_ELEMENT;
    return y * this.width * this.info.channels + x * this.info.channels + channel;
  }

  value(x: number, y: number, channel: number) {
    const idx = this.index(x, y, channel);
    return this.data[idx];
  }

  values(x: number, y: number) {
    const idx = this.index(x, y, 0);
    return this.data.subarray(idx, idx + this.info.channels);
  }

  

}
