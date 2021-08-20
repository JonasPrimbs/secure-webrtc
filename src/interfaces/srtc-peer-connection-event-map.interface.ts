/**
 * @file Contains mapping of event names to types of objects emitted by the SRTCPeerConnection events.
 * @module secure-webrtc
 * @author Jonas Primbs <mail@jonasprimbs.de>
 * @license MIT
 * @copyright Jonas Primbs 2021
 * @version 0.0.1
 */

export interface SRTCPeerConnectionEventMap {

  'datachannel': RTCDataChannelEvent;

  'icecandidate': RTCPeerConnectionIceEvent;

  'iceconnectionstatechange': Event;

  'icegatheringstatechange': Event;

  'negotiationneeded': Event;

  'signalingstatechange': Event;

  'track': RTCTrackEvent;
}
