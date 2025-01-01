import { AxiosError } from 'axios';

export enum NijiApiError {
    INVALID_API_KEY = 'API Key is invalid/missing.',
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export const handleError = (error: AxiosError): void => {
    if (error.response?.status === 401) {
        throw new Error(NijiApiError.INVALID_API_KEY);
    } else if (error.code === 'ECONNABORTED') {
        throw new Error(NijiApiError.TIMEOUT);
    } else if (error.isAxiosError) {
        throw new Error(NijiApiError.NETWORK_ERROR);
    } else {
        throw new Error(NijiApiError.UNKNOWN_ERROR);
    }
};
