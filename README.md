# NijiApiClient

`NijiApiClient` is a TypeScript/JavaScript client library for interacting with the Niji API. It supports fetching various types of images from the API, handling caching, logging, and more. This client can be used in both TypeScript and JavaScript projects.

## Features

- **Fetch Images**: Get random and category-specific images (waifu, husbando, maid, animals).
- **API Stats**: Retrieve API statistics including request counts, uptime, and more.
- **Caching**: Optionally cache images locally to reduce the number of API requests.
- **Logging**: Enable detailed logging for API requests and responses.
- **Error Handling**: Built-in error handling with customizable error messages.
- **API Versioning**: Support for multiple API versions (v1 only rn).

## Installation

To install package run the following command:
```bash
npm install niji-api-client
```
or
```bash
yarn add niji-api-client
```

## Usage
### Typescript
1. Import the client:
```typescript
import NijiApiClient from 'niji-api-client';
```
2. Create a new instance of the client and make requests:
```typescript
const client = new NijiApiClient({
    apiKey: 'your-api-key',
    version: 'v1', // optional, default is 'v1'
    timeout: 5000, // optional, default is 5000 ms
    cacheEnabled: true, // optional
    logEnabled: true // optional
});

// Fetch a waifu image
client.getWaifuImage().then(response => {
    console.log(response); // response.imageURL | .mimeType | .dimensions
}).catch(error => {
    console.error('Error fetching waifu image:', error);
});

// Fetch API statistics
client.getStats().then(stats => {
    console.log('API Statistics:', stats); // .totalUsers | .totalRequests | .uptime
}).catch(error => {
    console.error('Error fetching stats:', error);
});
```
### Javascript
1. Require the client:
```javascript
const NijiApiClient = require('niji-api-client');
```
2. Create a new instance and make requests:
```javascript
const client = new NijiApiClient({
    apiKey: 'your-api-key',
    version: 'v1', // optional, default is 'v1'
    timeout: 5000, // optional, default is 5000 ms
    cacheEnabled: true, // optional
    logEnabled: true // optional
});

// Fetch a waifu image
client.getWaifuImage().then(response => {
    console.log(response); // response.imageURL | .mimeType | .dimensions
}).catch(error => {
    console.error('Error fetching waifu image:', error);
});

// Fetch API statistics
client.getStats().then(stats => {
    console.log('API Statistics:', stats); // .totalUsers | .totalRequests | .uptime
}).catch(error => {
    console.error('Error fetching stats:', error);
});
```
### Methods

#### `getWaifuImage()`
Fetches a random image of a waifu.
- Returns `Promise<ImageResponse>`
#### `getMaidImage()`
Fetches a random image of a maid.
- Returns: `Promise<ImageResponse>`
#### `getAnimalImage()`
Fetches a random image of an animal.
- Returns: `Promise<ImageResponse>`
#### `getHusbandoImage()`
Fetches a random image of a husbando.
- Returns: `Promise<ImageResponse>`
#### `getRandomImage()`
Fetches a random image from all available categories.
- Returns: `Promise<ImageResponse>`
#### `getStats()`
Fetches API statistics, such as the number of images available.
- Returns: `Promise<StatsResponse>`

### Caching
If enabled, the client will cache the images for subsequent requests. Cached images are retrieved using the path provided in the request.
#### **Enabling cache**
To enable caching, pass `cacheEnabled: true` when initializing the client.
```javascript
const client = new NijiApiClient({
    apiKey: 'your-api-key',
    cacheEnabled: true
});
```
#### **Cache behavior**
- If an image is cached, it will be returned immediately without hitting the API again.
- If caching is disabled or the image is not cached, the image will be fetched from the API.

### Logging
If enabled, the client will log requests and errors to the console.
#### **Enabling logging**
To enable logging, pass `logEnabled: true` when initializing the client.
```javascript
const client = new NijiApiClient({
    apiKey: 'your-api-key',
    logEnabled: true
});
```
#### **Log behavior**
- Logs requests and responses for debugging and tracking.
- Logs errors encountered during requests.

## Error Handling
The client includes built-in error handling. If an error occurs while fetching an image or API data, it will be caught and handled. Errors are returned as `Promise.reject` with an appropriate error message.

The error handler will log the error (if logging is enabled) and then reject the promise.

## Type Definitions
The client returns an `ImageResponse` for image fetch requests. This response contains the following properties:

#### `ImageResponse`
```typescript
interface ImageResponse {
    imageURL: string;
    mimeType: string;
    dimensions: ImageDimensions;
}
```
#### `ImageDimensions`
```typescript
interface ImageDimensions {
    width: number;
    height: number;
}
```

## Configuration Options
The following configuration options are available when initializing the NijiApiClient:
`NijiApiClient`:
| Option         | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `apiKey`       | `string` | Your Niji API key.                                                           |
| `version`      | `string` | The version of the API to use (`v1`, `v2`, `v3`). Default is `'v1'`.          |
| `timeout`      | `number` | Timeout for API requests in milliseconds. Default is `5000` ms.              |
| `cacheEnabled` | `boolean`| Enable caching for API responses. Default is `false`.                        |
| `logEnabled`   | `boolean`| Enable logging for requests and errors. Default is `false`.                  |


## License
This project is licensed under the MIT License - see the LICENSE file for details.