/**
 * @file Contains type definition of a token request callback method.
 * @module secure-webrtc
 * @author Jonas Primbs <mail@jonasprimbs.de>
 * @license MIT
 * @copyright Jonas Primbs 2021
 * @version 0.0.1
 */

import { SRTCFingerprint } from "../interfaces/srtc-fingerprint.interface";

/**
 * Requests a new RTCCertificate bound OAuth Access Token and OIDC ID Token.
 * @param fingerprint Base64Url encoded fingerprint of RTCCertificate.
 * @returns A dictionary which contains an OAuth Access Token and an OIDC ID Token, both bound to the given fingerprint.
 */
export type TokenRequestCallback = (fingerprint: SRTCFingerprint) => Promise<{ accessToken: string, idToken: string }> | { accessToken: string, idToken: string };
