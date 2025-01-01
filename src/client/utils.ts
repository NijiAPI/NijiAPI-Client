export const validateVersion = (version: string, validVersions: string[]): void => {
    if (!validVersions.includes(version)) {
        throw new Error(`Invalid API version. Available versions: ${validVersions.join(', ')}`);
    }
};
