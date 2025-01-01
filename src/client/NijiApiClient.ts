import axios, { AxiosError } from 'axios';
import { NijiApiClientOptions } from '../types/NijiApiClientOptions';
import { getCachedImage, setCacheImage } from './cache';
import { log } from './logger';
import { validateVersion } from './utils';
import { handleError } from './NijiApiError';
import { StatsResponse } from '../types/APIResponse';

interface ImageDimensions {
    width: number;
    height: number;
}

interface ImageResponse {
    imageURL: string;
    mimeType: string;
    dimensions: ImageDimensions;
}

class NijiApiClient {
    private apiKey: string;
    private baseUrl: string;
    private timeout: number;
    private cacheEnabled: boolean;
    private logEnabled: boolean;

    private static validVersions = ['v1', 'v2', 'v3'];

    constructor(options: NijiApiClientOptions) {
        const { apiKey, version = 'v1', timeout = 5000, cacheEnabled = false, logEnabled = false } = options;

        validateVersion(version, NijiApiClient.validVersions);

        this.apiKey = apiKey;
        this.baseUrl = `https://api.nijiapi.xyz/${version}`;
        this.timeout = timeout;
        this.cacheEnabled = cacheEnabled;
        this.logEnabled = logEnabled;
    }

    private async fetchImage(path: string): Promise<ImageResponse> {
        const cachedImage = this.cacheEnabled ? getCachedImage(path) : null;
        if (cachedImage) {
            log(`Image for path ${path} found in cache`, this.logEnabled);
            return cachedImage;
        }
        try {
            log(`Fetching image from ${path}`, this.logEnabled);
            const response = await axios.get(`${this.baseUrl}/${path}`, {
                headers: { 'x-api-key': this.apiKey },
                timeout: this.timeout,
            });
            const data: ImageResponse = response.data;
            if (this.cacheEnabled) {
                setCacheImage(path, data);
            }
            return data;
        } catch (error: any | AxiosError) {
            handleError(error);
            return Promise.reject('Error occurred while fetching the image.');
        }
    }

    async getWaifuImage(): Promise<ImageResponse> {
        return this.fetchImage('waifu');
    }

    async getMaidImage(): Promise<ImageResponse> {
        return this.fetchImage('maid');
    }

    async getAnimalImage(): Promise<ImageResponse> {
        return this.fetchImage('animals');
    }

    async getHusbandoImage(): Promise<ImageResponse> {
        return this.fetchImage('husbando');
    }

    async getRandomImage(): Promise<ImageResponse> {
        return this.fetchImage('random-image');
    }

    async getStats(): Promise<StatsResponse> {
        try {
            log(`Fetching API's statistics`, this.logEnabled);
            const response = await axios.get(`${this.baseUrl}/stats`, {
                headers: { 'x-api-key': this.apiKey, timeout: this.timeout }
            });
            const data: StatsResponse = response.data;
            return data;
        } catch (error: any | AxiosError) {
            handleError(error);
            return Promise.reject('Error occurred while fetching statistics.');
        }
    }
}

module.exports = NijiApiClient;
export default NijiApiClient;