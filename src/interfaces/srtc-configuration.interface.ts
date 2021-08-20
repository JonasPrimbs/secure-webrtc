/**
 * @file Contains specification of an SRTC Configuration.
 * @module secure-webrtc
 * @author Jonas Primbs <mail@jonasprimbs.de>
 * @license MIT
 * @copyright Jonas Primbs 2021
 * @version 0.0.1
 */

import { TokenRequestCallback } from '../types/token-request-callback.types';
import { SRTCIdentityProvider } from './srtc-identity-provider.interface';

export interface SRTCConfiguration {

  /**
   * Specifies how to handle negotiation of candidates when the remote peer is not compatible with the SDP BUNDLE standard. If the remote endpoint is BUNDLE-aware, all media tracks and data channels are bundled onto a single transport at the completion of negotiation, regardless of policy used, and any superfluous transports that were created initially are closed at that point.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration/bundlePolicy
   */
  bundlePolicy?: RTCBundlePolicy;

  /**
   * An Array of objects of type RTCCertificate which are used by the connection for authentication. If this property isn't specified, a set of certificates is generated automatically for each RTCPeerConnection instance. Although only one certificate is used by a given connection, providing certificates for multiple algorithms may improve the odds of successfully connecting in some circumstances. See Using certificates for further information.
   * This configuration option cannot be changed after it is first specified; once the certificates have been set, this property is ignored in future calls to RTCPeerConnection.setConfiguration().
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration/certificates
   */
  certificates?: RTCCertificate[];

  /**
   * An unsigned 16-bit integer value which specifies the size of the prefetched ICE candidate pool. The default value is 0 (meaning no candidate prefetching will occur). You may find in some cases that connections can be established more quickly by allowing the ICE agent to start fetching ICE candidates before you start trying to connect, so that they're already available for inspection when RTCPeerConnection.setLocalDescription() is called.
   * Changing the size of the ICE candidate pool may trigger the beginning of ICE gathering.
   */
  iceCandidatePoolSize?: number;

  /**
   * An array of RTCIceServer objects, each describing one server which may be used by the ICE agent; these are typically STUN and/or TURN servers. If this isn't specified, the connection attempt will be made with no STUN or TURN server available, which limits the connection to local peers.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration/iceServers
   */
  iceServers?: RTCIceServer[];

  /**
   * The current ICE transport policy; if the policy isn't specified, all is assumed by default, allowing all candidates to be considered.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration/iceTransportPolicy
   */
  iceTransportPolicy?: RTCIceTransportPolicy;

  /**
   * Specifies a custom callback method to request a new OAuth Access Token and OIDC ID Token for a fingerprint of an RTCCertificate.
   */
  customTokenRequestCallback: TokenRequestCallback;

  /**
   * Identity provider of local peer.
   * If not specified, the first IdP specified in trustedIdentityProviders will be used.
   */
  identityProvider?: string;

  /**
   * A DOMString which specifies the target peer identity for the RTCPeerConnection (userID@identityProviderId). If this value is set (it defaults to null), the RTCPeerConnection will not connect to a remote peer unless it can successfully authenticate with the given name at the specified identity provider.
   */
  peerIdentity?: string;

  /**
   * A dictionary mapping unique Identity Provider IDs to SRTCIdentityProvider instances which are used to validate identities of remote peers.
   * If not specified, SRTCPeerConnection.trustedIdentityProviders will be used instead.
   */
  trustedIdentityProviders?: { [idpId: string]: SRTCIdentityProvider };

  /**
   * The RTCP mux policy to use when gathering ICE candidates, in order to support non-multiplexed RTCP.
   */
  rtcpMuxPolicy?: RTCRtcpMuxPolicy;

  /**
   * Class definition of original RTCPeerConnection.
   * If not specified, SRTCPeerConnection.RTCPeerConnection will be used.
   */
  rtcPeerConnection?: any;
}
