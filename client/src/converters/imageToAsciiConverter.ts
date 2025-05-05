interface AsciiOptions {
  width: number;
  chars: string;
  contrast: number;
}

const DEFAULT_OPTIONS: AsciiOptions = {
  width: 150,
  chars: "¶@ØÆMåBNÊßÔR#8Q&mÃ0À$GXZA5ñk2S%±3Fz¢yÝCJf1t7ªLc¿+?(r/¤²!*;\"^:,'.` ", // from dense char to thin char
  contrast: 1.0,
};

export default async function imageToAscii(
  imageFile: File,
  options?: AsciiOptions,
): Promise<string> {
  const { width, chars, contrast } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  const image = await loadImage(imageFile);
  const { data } = getImageData(image, width);

  const aspectRatio = image.height / image.width;
  const newHeight = Math.floor(width * aspectRatio);

  let asciiImage = "";

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4; // each pixel represents as RGBA - 4 bits
      const [r, g, b] = data.slice(idx, idx + 3);
      const brightness = getBrightness(r, g, b, contrast);
      const char = getAsciiChar(brightness, chars);
      asciiImage += char;
      asciiImage += char;
    }
    asciiImage += "\n";
  }
  return asciiImage;
}

function getBrightness(
  r: number,
  g: number,
  b: number,
  contrast: number,
): number {
  // grayscale color: 0 - 1 (dark - bright)
  let brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  // Adjust contrast: 0 - 1 (dark - bright)
  brightness = Math.min(1, Math.max(0, (brightness - 0.5) * contrast + 0.5));
  return brightness;
}

function getAsciiChar(brightness: number, chars: string): string {
  // select char brightness: index 0 - dense char (like "@"), last index - thin char (like ".")
  const index = Math.floor((1 - brightness) * (chars.length - 1));
  return chars[index];
}

async function loadImage(source: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    const reader = new FileReader();
    reader.onload = (e) => (image.src = e.target?.result as string);
    reader.readAsDataURL(source);
  });
}

function getImageData(image: HTMLImageElement, targetWidth: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // compressing image to target width and height
  const aspectRatio = image.height / image.width;
  canvas.width = targetWidth;
  canvas.height = targetWidth * aspectRatio;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
