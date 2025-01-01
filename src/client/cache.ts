import { ImageResponse } from "../types/APIResponse";

let cache: Record<string, ImageResponse> = {};

export function getCachedImage(path: string): ImageResponse | null {
    return cache[path] || null;
}

export function setCacheImage(path: string, data: ImageResponse): void {
    cache[path] = data;
}
