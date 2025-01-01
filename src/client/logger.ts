export const log = (message: string, logEnabled: boolean): void => {
    if (logEnabled) {
        console.log(`[NijiApiClient] ${message}`);
    }
};
