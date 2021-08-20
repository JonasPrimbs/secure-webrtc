# Secure WebRTC

A WebRTC JavaScript Library supporting decentralized OAuth 2 based authorization and OpenID Connect based authentication.

## Install

```console
npm install --save secure-webrtc
```
<details>
<summary><em>For Node.js</em> (Click to expand)</summary>

First install [node-webrtc](https://github.com/node-webrtc/node-webrtc) for Node.js support of WebRTC:
```console
npm install --save wrtc
```

Then import and apply definition:
```javascript
const srtc = require('secure-webrtc');
const wrtc = require('wrtc');

srtc.SRTCPeerConnection.RTCPeerConnection = wrtc.RTCPeerConnection;
```
Or with ES6 module style:
```typescript
import { SRTCPeerConnection } from 'secure-webrtc';
import { RTCPeerConnection } from 'wrtc';

SRTCPeerConnection.RTCPeerConnection = RTCPeerConnection;
```
</details>

## Usage

```javascript

```

## Platform Support

The following table shows the versions which are supported:

| Platform                         | Partial | Full  | Tested |
|----------------------------------|---------|-------|--------|
| Chrome <sup>[1]</sup>            | 23-76   | 77+   | -      |
| Edge <sup>[1]</sup>              | 15-78   | 79+   | -      |
| Firefox <sup>[1]</sup>           | 44-69   | 70+   | -      |
| Internet Explorer <sup>[1]</sup> | -       | -     | -      |
| Opera <sup>[1]</sup>             | 43+     | -     | -      |
| Safari <sup>[1]</sup>            | 11-14.0 | 14.1+ | -      |
| WebView Android <sup>[1]</sup>   | 37-76   | 77+   | -      |
| Chrome Android <sup>[1]</sup>    | 25-76   | 77+   | -      |
| Firefox Android <sup>[1]</sup>   | 44+     | -     | -      |
| Opera Android <sup>[1]</sup>     | 43-54   | 55+   | -      |
| Safari iOS <sup>[1]</sup>        | 11-14.4 | 14.5+ | -      |
| Samsung Internet <sup>[1]</sup>  | 6-11    | 12+   | -      |
| Node <sup>[2]</sup>              | -       | 8+    | -      |
| Electron <sup>[2], [3]</sup>     | -       | 4+    | -      |

- **Partial** support means, that the major features might be supported
- **Full** support means, that all features might be supported
- **Tested** means, that this is the last version that was tested 

<sup>1</sup> See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection#browser_compatibility)

<sup>2</sup> See [node-webrtc](https://github.com/node-webrtc/node-webrtc#supported-platforms)

<sup>3</sup> Only on x64 platform

## Documentation

Documentation can be found [here](docs/README.md).

## Licensing

This software is licensed with the MIT license.

&copy; 2021 Jonas Primbs, Tübingen
