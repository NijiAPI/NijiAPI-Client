export interface ImageDimensions {
    width: number;
    height: number;
}

export interface ImageResponse {
    imageURL: string;
    mimeType: string;
    dimensions: ImageDimensions;
}

export interface StatsResponse {
    totalRequests: number,
    totalUsers: number,
    uptime: string,
}