import { Image } from "./image";


export function setDisplayData(displayData: Uint8ClampedArray, image: Image, vmin: number, vmax: number, channels: Array<number>) {
  const values = [0, 0, 0, 255];

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      for (let c = 0; c < channels.length; c++) {
        values[c] = 255 * (image.value(x, y, channels[c]) - vmin) / (vmax - vmin);
      }

      const idx = 4 * (y * image.width + x);
      displayData[idx + 0] = values[0];
      displayData[idx + 1] = values[1];
      displayData[idx + 2] = values[2];
      displayData[idx + 3] = values[3];
    }
  }
}

