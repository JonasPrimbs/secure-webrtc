import { FingerprintAlgorithms } from '../types/fingerprint-algorithms.types';

export interface SRTCFingerprint {

  algorithm: FingerprintAlgorithms;

  fingerprint: Uint8Array;
}
