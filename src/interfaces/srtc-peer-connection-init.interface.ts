/**
 * @file Contains abstract definition for SRTCPeerConnection.
 * @module secure-webrtc
 * @author Jonas Primbs <mail@jonasprimbs.de>
 * @license MIT
 * @copyright Jonas Primbs 2021
 * @version 0.0.1
 */

import { SRTCPeerConnectionEventMap } from '..';

export interface SRTCPeerConnectionInit extends EventTarget {

  /** ICE and Signaling States */

  readonly iceConnectionState: RTCIceConnectionState;

  readonly iceGatheringState: RTCIceGatheringState;

  readonly signalingState: RTCSignalingState;

  /** Session Descriptions */

  readonly currentLocalDescription: RTCSessionDescription | null;

  readonly currentRemoteDescription: RTCSessionDescription | null;

  readonly pendingLocalDescription: RTCSessionDescription | null;

  readonly pendingRemoteDescription: RTCSessionDescription | null;

  readonly localDescription: RTCSessionDescription | null;

  readonly remoteDescription: RTCSessionDescription | null;

  /** Channel and Stream Management */

  createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit): RTCDataChannel;

  addTrack(track: MediaStreamTrack, ...streams: MediaStream[]): RTCRtpSender;

  removeTrack(sender: RTCRtpSender): void;

  addTransceiver(trackOrKind: MediaStreamTrack | string, init?: RTCRtpTransceiverInit): RTCRtpTransceiver;

  getTransceivers(): RTCRtpTransceiver[];

  getSenders(): RTCRtpSender[];

  getReceivers(): RTCRtpReceiver[];

  /** ICE and Signaling Management */

  addIceCandidate(candidate: RTCIceCandidateInit | RTCIceCandidate): Promise<void>;

  gatherIceCandidates(): Promise<void>;

  restartIce(): void;

  /** Session Description Management */

  createAnswer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit>;

  createOffer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit>;

  setLocalDescription(description?: RTCSessionDescriptionInit): Promise<void>;

  setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void>;

  /** Connection Management */

  close(): void;

  getConfiguration(): RTCConfiguration;

  getStats(selector?: MediaStreamTrack | null): Promise<RTCStatsReport>;

  /** Events */

  ondatachannel: ((this: RTCPeerConnection, ev: RTCDataChannelEvent) => any) | null;

  onicecandidate: ((this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) => any) | null;

  oniceconnectionstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;

  onicegatheringstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;

  onnegotiationneeded: ((this: RTCPeerConnection, ev: Event) => any) | null;

  onsignalingstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;

  ontrack: ((this: RTCPeerConnection, ev: RTCTrackEvent) => any) | null;

  /** Event Handling */

  addEventListener<K extends keyof SRTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: SRTCPeerConnectionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

  removeEventListener<K extends keyof SRTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: SRTCPeerConnectionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}
