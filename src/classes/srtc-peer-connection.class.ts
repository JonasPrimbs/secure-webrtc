/**
 * @file Contains specification of an SRTC Peer Connection object.
 * @module secure-webrtc
 * @author Jonas Primbs <mail@jonasprimbs.de>
 * @license MIT
 * @copyright Jonas Primbs 2021
 * @version 0.0.1
 */

import { SRTCConfiguration, SRTCIdentityProvider, SRTCPeerConnectionInit } from '..';
import { SRTCFingerprint } from '../interfaces/srtc-fingerprint.interface';
import { FingerprintAlgorithms } from '../types/fingerprint-algorithms.types';
import { TokenRequestCallback } from '../types/token-request-callback.types';

export class SRTCPeerConnection implements SRTCPeerConnectionInit {

  /**
   * Used implementation of RTCPeerConnection.
   */
  static RTCPeerConnection: typeof RTCPeerConnection = RTCPeerConnection;

  /**
   * A dictionary mapping unique Identity Provider IDs to SRTCIdentityProvider instances which are used to validate identities of remote peers in SRTCPeerConnection instances which did not specify trusted identity providers themselves.
   */
  static trustedIdentityProviders: { [idpId: string]: SRTCIdentityProvider } = {};

  /**
   * Creates an X.509 certificate and its corresponding private key, returning a Promise that resolves with the new RTCCertificate once it is generated.
   * @param keygenAlgorithm A Web Crypto API AlgorithmIdentifier string or an Algorithm -subclassed object specifying an algorithm to use when creating the certificate's key.
   * @returns A promise which resolves to a new RTCCertificate object containing a new key based on the specified options.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/generateCertificate
   */
  static async generateCertificate(keygenAlgorithm: AlgorithmIdentifier): Promise<RTCCertificate> {
    return await SRTCPeerConnection.RTCPeerConnection.generateCertificate(keygenAlgorithm);
  }

  /**
   * Internal RTC Peer Connection instance.
   */
  private readonly peer: SRTCPeerConnectionInit;

  private readonly requestToken: TokenRequestCallback = (fingerprint: SRTCFingerprint) => {
    return {
      accessToken: '',
      idToken: ''
    };
  };

  /** Constructor */

  /**
   * Returns a newly-created RTCPeerConnection, which represents a connection between the local device and a remote peer.
   * @param configuration An RTCConfiguration dictionary providing options to configure the new connection.
   */
  constructor(configuration?: SRTCConfiguration) {
    // Set token request callback.
    if (configuration?.customTokenRequestCallback) {
      this.requestToken = configuration.customTokenRequestCallback;
    }
    // Create new RTC Peer Connection.
    if (configuration?.rtcPeerConnection) {
      // Use RTCPeerConnection implementation provided by configuration.
      this.peer = new configuration.rtcPeerConnection(configuration);
    } else {
      // Use default RTCPeerConnection implementation.
      this.peer = new SRTCPeerConnection.RTCPeerConnection(configuration);
    }
  }

  /** ICE and Signaling States */

  /**
   * Returns a string which state of the ICE agent associated with this RTCPeerConnection.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
   */
  get iceConnectionState(): RTCIceConnectionState {
    return this.peer.iceConnectionState;
  }

  /**
   * Returns a string that describes connection's ICE gathering state. This lets you detect, for example, when collection of ICE candidates has finished.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceGatheringState
   */
  get iceGatheringState(): RTCIceGatheringState {
    return this.peer.iceGatheringState;
  }

  /**
   * Returns a string describing the state of the signaling process on the local end of the connection while connecting or reconnecting to another peer. It is one of the following values: stable, have-local-offer, have-remote-offer, have-local-pranswer, or have-remote-pranswer.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/signalingState
   */
  get signalingState(): RTCSignalingState {
    return this.peer.signalingState;
  }

  /** Session Descriptions */

  /**
   * Returns an RTCSessionDescription object describing the local end of the connection as it was most recently successfully negotiated since the last time this RTCPeerConnection finished negotiating and connecting to a remote peer. Also included is a list of any ICE candidates that may already have been generated by the ICE agent since the offer or answer represented by the description was first instantiated.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/currentLocalDescription
   */
  get currentLocalDescription(): RTCSessionDescription | null {
    return this.peer.currentLocalDescription;
  }

  /**
   * Returns an RTCSessionDescription object describing the remote end of the connection as it was most recently successfully negotiated since the last time this RTCPeerConnection finished negotiating and connecting to a remote peer. Also included is a list of any ICE candidates that may already have been generated by the ICE agent since the offer or answer represented by the description was first instantiated.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/currentRemoteDescription
   */
  get currentRemoteDescription(): RTCSessionDescription | null {
    return this.peer.currentLocalDescription;
  }

  /**
   * Returns an RTCSessionDescription object describing a pending configuration change for the local end of the connection. This does not describe the connection as it currently stands, but as it may exist in the near future.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/pendingLocalDescription
   */
  get pendingLocalDescription(): RTCSessionDescription | null {
    return this.peer.pendingLocalDescription;
  }

  /**
   * Returns an RTCSessionDescription object describing a pending configuration change for the remote end of the connection. This does not describe the connection as it currently stands, but as it may exist in the near future.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/pendingRemoteDescription
   */
  get pendingRemoteDescription(): RTCSessionDescription | null {
    return this.peer.pendingRemoteDescription;
  }

  /**
   * Returns an RTCSessionDescription describing the session for the local end of the connection.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/localDescription
   */
  get localDescription(): RTCSessionDescription | null {
    return this.peer.localDescription;
  }

  /**
   * Returns an RTCSessionDescription object describing the session, including configuration and media information, for the remote end of the connection. If this hasn't been set yet, this returns null.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/remoteDescription
   */
  get remoteDescription(): RTCSessionDescription | null {
    return this.peer.remoteDescription;
  }

  /** Channel and Stream Management */

  /**
   * Initiates the creation a new channel linked with the remote peer, over which any kind of data may be transmitted. This can be useful for back-channel content, such as images, file transfer, text chat, game update packets, and so forth.
   * @param label A human-readable name for the channel. This string may not be longer than 65,535 bytes.
   * @param dataChannelDict An object providing configuration options for the data channel.
   * @returns A new RTCDataChannel object with the specified label, configured using the options specified by options if that parameter is included; otherwise, the defaults listed above are established.
   * @throws InvalidStateError The RTCPeerConnection is closed.
   * @throws TypeError The label and/or protocol string is too long; these cannot be longer than 65,535 bytes (bytes, rather than characters).
   * @throws TypeError The id is 65535. While this is a valid unsigned 16-bit value, it's not a permitted value for id.
   * @throws SyntaxError Values were specified for both the maxPacketLifeTime and maxRetransmits options. You may only specify a non-null value for one of these.
   * @throws ResourceInUse An id was specified, but another RTCDataChannel is already using the same value.
   * @throws OperationError Either the specified id is already in use or, if no id was specified, the WebRTC layer was unable to automatically generate an ID because all IDs are in use.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createDataChannel
   */
  createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit): RTCDataChannel {
    return this.peer.createDataChannel(label, dataChannelDict);
  }

  /**
   * Adds a new media track to the set of tracks which will be transmitted to the other peer.
   * @param track A MediaStreamTrack object representing the media track to add to the peer connection.
   * @param streams One or more local MediaStream objects to which the track should be added.
   * @returns The RTCRtpSender object which will be used to transmit the media data.
   * @throws InvalidAccessError The specified track (or all of its underlying streams) is already part of the RTCPeerConnection.
   * @throws InvalidStateError The RTCPeerConnection is closed.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack
   */
  addTrack(track: MediaStreamTrack, ...streams: MediaStream[]): RTCRtpSender {
    return this.peer.addTrack(track, ...streams);
  }

  /**
   * Tells the local end of the connection to stop sending media from the specified track, without actually removing the corresponding RTCRtpSender from the list of senders as reported by getSenders(). If the track is already stopped, or is not in the connection's senders list, this method has no effect.
   * @param sender A RTCRtpSender specifying the sender to remove from the connection.
   * @throws InvalidStateError The connection is not open.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/removeTrack
   */
  removeTrack(sender: RTCRtpSender): void {
    return this.peer.removeTrack(sender);
  }

  /**
   * Creates a new RTCRtpTransceiver and adds it to the set of transceivers associated with the connection. Each transceiver represents a bidirectional stream, with both an RTCRtpSender and an RTCRtpReceiver associated with it.
   * @param trackOrKind A MediaStreamTrack to associate with the transceiver, or a DOMString which is used as the kind of the receiver's track, and by extension of the RTCRtpReceiver itself.
   * @param init An object that conforms to the RTCRtpTransceiverInit dictionary which provides any options that you may wish to specify when creating the new transceiver.
   * @returns Created RTCRtpTransceiver instance.
   * @throws TypeError A string was specified as trackOrKind which is not valid. The string must be either "audio" or "video".
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTransceiver
   */
  addTransceiver(trackOrKind: string | MediaStreamTrack, init?: RTCRtpTransceiverInit): RTCRtpTransceiver {
    return this.peer.addTransceiver(trackOrKind, init);
  }

  /**
   * Returns a list of all the RTCRtpTransceiver objects being used to send and receive data on the connection.
   * @returns An array of the RTCRtpTransceiver objects representing the transceivers handling sending and receiving all media on the RTCPeerConnection. The list is in the order in which the transceivers were added to the connection.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getTransceivers
   */
  getTransceivers(): RTCRtpTransceiver[] {
    return this.peer.getTransceivers();
  }

  /**
   * Returns an array of RTCRtpSender objects, each of which represents the RTP sender responsible for transmitting one track's data.
   * @returns An array of RTCRtpSender objects, one for each track on the connection. The array is empty if there are no RTP senders on the connection. The order of the returned RTCRtpSenders is not defined by the specification, and may change from one call to getSenders() to the next.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getSenders
   */
  getSenders(): RTCRtpSender[] {
    return this.peer.getSenders();
  }

  /**
   * Returns an array of RTCRtpReceiver objects, each of which represents one RTP receiver.
   * @returns An array of RTCRtpReceiver objects, one for each track on the connection. The array is empty if there are no RTP receivers on the connection. The order of the returned RTCRtpReceiver instances is not defined by the specification, and may change from one call to getReceivers() to the next.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getReceivers
   */
  getReceivers(): RTCRtpReceiver[] {
    return this.peer.getReceivers();
  }

  /** ICE and Signaling Management */

  /**
   * Adds a new remote ICE candidate to the SRTCPeerConnection's remote description, which describes the state of the remote end of the connection.
   * If the candidate parameter is missing or a value of null is given when calling addIceCandidate(), the added ICE candidate is an "end-of-candidates" indicator. The same is the case if the value of the specified object's candidate is either missing or an empty string (""), it signals that all remote candidates have been delivered.
   * @param candidate ICE candidate to add.
   * @throws TypeError The specified candidate's sdpMid and sdpMLineIndex are both null.
   * @throws InvalidStateError The RTCPeerConnection currently has no remote peer established (remoteDescription is null).
   * @throws OperationError The value specified for sdpMid is non-null and doesn't match the media description ID of any media description included within the remoteDescription.
   * @throws OperationError The specified value of sdpMLineIndex is greater than or equal to the number of media descriptions included in the remote description.
   * @throws OperationError The specified ufrag doesn't match the ufrag field in any of the remote descriptions being considered.
   * @throws OperationError One or more of the values in the candidate string are invalid or could not be parsed.
   * @throws OperationError Attempting to add the candidate fails for any reason.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addIceCandidate
   */
  async addIceCandidate(candidate: RTCIceCandidateInit | RTCIceCandidate): Promise<void> {
    await this.peer.addIceCandidate(candidate);
  }

  /**
   * Returns a Promise which resolves when ICE gathering completed. If ICE gathering already completed, the Promise resolves immediately.
   * Make sure to set a local or remote description before or while awaiting this Promise! SRTCPeerConnection will not start gathering ICE candidates before any description is set.
   */
  async gatherIceCandidates(): Promise<void> {
    if (this.iceGatheringState !== 'complete') {
      await new Promise<void>((resolve) => {
        const onIceGatheringStateChange = (ev: Event) => {
          if (this.iceGatheringState === 'complete') {
            this.removeEventListener('icegatheringstatechange', onIceGatheringStateChange);
            resolve();
          }
        };
        this.addEventListener('icegatheringstatechange', onIceGatheringStateChange);
      });
    }
  }

  /**
   * Allows to easily request that ICE candidate gathering be redone on both ends of the connection. This simplifies the process by allowing the same method to be used by either the caller or the receiver to trigger an ICE restart.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/restartIce
   */
  restartIce(): void {
    if (this.peer.restartIce) {
      this.peer.restartIce();
    } else {
      console.warn('[SRTCPeerConnection] restartIce() is not supported in native implementation! See https://caniuse.com/?search=restartIce for browser support');
    }
  }

  /** Session Description Management */

  private hexToUint8(hex: string): Uint8Array {
    const bytes = hex.split(':');
    return new Uint8Array(bytes.map(b => parseInt(b, 16)));
  }
  private uint8ToBase64Url(bytes: Uint8Array): string {
    let result = '', i, l = bytes.length;
    const base64url = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', '\\'
    ];
    for (i = 2; i < l; i += 3) {
      result += base64url[bytes[i - 2] >> 2];
      result += base64url[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += base64url[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
      result += base64url[bytes[i] & 0x3F];
    }
    if (i === l + 1) { // 1 octet yet to write
      result += base64url[bytes[i - 2] >> 2];
      result += base64url[(bytes[i - 2] & 0x03) << 4];
      result += "==";
    }
    if (i === l) { // 2 octets yet to write
      result += base64url[bytes[i - 2] >> 2];
      result += base64url[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += base64url[(bytes[i - 1] & 0x0F) << 2];
      result += "=";
    }
    return result;
  }
  private extractFingerprints(sessionDescription: string): SRTCFingerprint[] {
    const fingerprints: SRTCFingerprint[] = [];
    let remaining;
    do {
      let match = sessionDescription.match(/a\=fingerprint\:?(sha\-d{3}) ([a-fA-F0-9\:]+)/);
      if (match) {
        fingerprints.push({
          algorithm: match[1].toUpperCase() as FingerprintAlgorithms,
          fingerprint: this.hexToUint8(match[2].toLowerCase())
        });
        remaining = sessionDescription.substring(match.index ?? 0 + match[0].length);
      } else {
        remaining = null;
      }
    } while (remaining);
    return fingerprints;
  }

  /**
   * Initiates the creation an SDP answer to an offer received from a remote peer during the offer/answer negotiation of a WebRTC connection. The answer contains information about any media already attached to the session, codecs and options supported by the browser, and any ICE candidates already gathered.
   * @param options An object which contains options which customize the answer; this is based on the RTCAnswerOptions dictionary.
   * @throws NotReadableError The identity provider wasn't able to provide an identity assertion.
   * @throws OperationError Generation of the SDP failed for some reason; this is a general failure catch-all exception.
   * @returns A Promise whose fulfillment handler is called with an object conforming to the RTCSessionDescriptionInit dictionary which contains the SDP answer to be delivered to the other peer.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createAnswer
   */
  async createAnswer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit> {
    const originalAnswer = await this.peer.createAnswer(options) as RTCSessionDescriptionInit;
    const fingerprints = this.extractFingerprints(originalAnswer.sdp!);
    const tokenRequests = fingerprints.map(f => this.requestToken(f));
    const tokens = await Promise.all(tokenRequests);
    const tokenSdpParameters = tokens.map(t => {
      let result = '';
      if (t.idToken) {
        result += `\r\na=identity:oidc ${t.idToken}`;
      }
      if (t.accessToken) {
        result += `\r\na=authorization:oauth2 ${t.accessToken}`;
      }
      return result;
    });
    const sdp = `${originalAnswer.sdp}${tokenSdpParameters.join()}`;
    return {
      sdp,
      type: originalAnswer.type
    };
  }

  /**
   * Initiates the creation of an SDP offer for the purpose of starting a new WebRTC connection to a remote peer. The SDP offer includes information about any MediaStreamTrack objects already attached to the WebRTC session, codec, and options supported by the browser, as well as any candidates already gathered by the ICE agent, for the purpose of being sent over the signaling channel to a potential peer to request a connection or to update the configuration of an existing connection.
   * @param options An RTCOfferOptions dictionary providing options requested for the offer.
   * @returns A Promise whose fulfillment handler will receive an object conforming to the RTCSessionDescriptionInit dictionary which contains the SDP describing the generated offer. That received offer should be delivered through the signaling server to a remote peer.
   * @throws InvalidStateError The RTCPeerConnection is closed.
   * @throws NotReadableError No certificate or set of certificates was provided for securing the connection, and createOffer() was unable to create a new one. Since all WebRTC connections are required to be secured, that results in an error.
   * @throws OperationError Examining the state of the system to determine resource availability in order to generate the offer failed for some reason.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
   */
  async createOffer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit> {
    return await this.peer.createOffer(options);
  }

  /**
   * Changes the local description associated with the connection. This description specifies the properties of the local end of the connection, including the media format. It returns a Promise which is fulfilled once the description has been changed, asynchronously.
   * @param description An RTCSessionDescriptionInit or RTCSessionDescription which specifies the configuration to be applied to the local end of the connection. If the description is omitted, the WebRTC runtime tries to automatically do the right thing.
   * @returns A Promise which is fulfilled once the value of RTCPeerConnection.localDescription is successfully changed or rejected if the change cannot be applied (for example, if the specified description is incompatible with one or both of the peers on the connection). The promise's fulfillment handler receives no input parameters.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setLocalDescription
   */
  async setLocalDescription(description?: RTCSessionDescriptionInit): Promise<void> {
    // Generate session description to apply as local description if not set.
    if (!description) {
      if (this.remoteDescription?.type === 'offer') {
        // Remote description already set and is offer -> Generate answer.
        description = await this.createAnswer();
      } else {
        // Remote description not yet set or is answer -> Generate offer.
        description = await this.createOffer();
      }
    }
    await this.peer.setLocalDescription(description);
  }

  /**
   * Sets the specified session description as the remote peer's current offer or answer. The description specifies the properties of the remote end of the connection, including the media format. It returns a Promise which is fulfilled once the description has been changed, asynchronously.
   * @param description An RTCSessionDescriptionInit or RTCSessionDescription which specifies the remote peer's current offer or answer.
   * @returns A Promise which is fulfilled once the value of the connection's remoteDescription is successfully changed or rejected if the change cannot be applied (for example, if the specified description is incompatible with one or both of the peers on the connection). The promise fulfillment handler receives no input parameters.
   * @throws InvalidAccessError The content of the description is invalid.
   * @throws InvalidStateError The RTCPeerConnection is closed, or it's in a state which isn't compatible with the specified description's type. For example, if the type is rollback and the signaling state is one of stable, have-local-pranswer, or have-remote-pranswer, this exception is thrown, because you can't roll back a connection that's either fully established or is in the final stage of becoming connected.
   * @throws OperationError Any errors that occur which don't match the others specified here are reported as OperationError. This includes identity validation errors.
   * @throws RTCError An RTCError with the errorDetail set to sdp-syntax-error is reported if the SDP specified by RTCSessionDescription.sdp. The error object's sdpLineNumber property indicates the line number within the SDP on which the syntax error was detected.
   * @throws TypeError The specified RTCSessionDescriptionInit or RTCSessionDescription object is missing the type property, or no description parameter was provided at all.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setRemoteDescription
   */
  async setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void> {
    await this.peer.setRemoteDescription(description);
  }

  /** Connection Management */

  /**
   * Closes the current peer connection.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/close
   */
  close(): void {
    this.peer.close();
  }

  /**
   * Returns an RTCConfiguration object which indicates the current configuration of the connection.
   * @returns An RTCConfiguration object describing the RTCPeerConnection's current configuration.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getConfiguration
   */
  getConfiguration(): RTCConfiguration {
    return this.peer.getConfiguration();
  }

  /**
   * Returns a Promise which resolves with data providing statistics about either the overall connection or about the specified MediaStreamTrack.
   * @param selector A MediaStreamTrack for which to gather statistics. If this is null (the default value), statistics will be gathered for the entire RTCPeerConnection.
   * @returns  Promise which resolves with an RTCStatsReport object providing connection statistics. The contents of the report depend on the selector as well as other details of the connection.
   * @throws InvalidAccessError There is no RTCRtpSender or RTCRtpReceiver whose track matches the specified selector, or selector matches more than one sender or receiver.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getStats
   */
  getStats(selector?: MediaStreamTrack | null): Promise<RTCStatsReport> {
    return this.peer.getStats(selector);
  }

  /** Events */

  /**
   * An event handler which specifies a function which is called to handle the datachannel event. This event, of type RTCDataChannelEvent, is sent when an RTCDataChannel is added to the connection by the remote peer calling createDataChannel().
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ondatachannel
   */
  get ondatachannel(): ((this: RTCPeerConnection, ev: RTCDataChannelEvent) => any) | null {
    return this.peer.ondatachannel;
  }
  /**
   * An event handler which specifies a function which is called to handle the datachannel event. This event, of type RTCDataChannelEvent, is sent when an RTCDataChannel is added to the connection by the remote peer calling createDataChannel().
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ondatachannel
   */
  set ondatachannel(value: ((this: RTCPeerConnection, ev: RTCDataChannelEvent) => any) | null) {
    this.peer.ondatachannel = value;
  }

  /**
   * An event handler which specifies a function which is called to handle the icecandidate event. This happens whenever the local ICE agent needs to deliver a message to the other peer through the signaling server.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate
   */
  get onicecandidate(): ((this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) => any) | null {
    return this.peer.onicecandidate;
  }
  /**
   * An event handler which specifies a function which is called to handle the icecandidate event. This happens whenever the local ICE agent needs to deliver a message to the other peer through the signaling server.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate
   */
  set onicecandidate(value: ((this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) => any) | null) {
    this.peer.onicecandidate = value;
  }

  /**
   * An event handler which specifies a function which is called to handle the iceconnectionstatechange event. This happens whenever the local ICE agent needs to deliver a message to the other peer through the signaling server.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/oniceconnectionstatechange
   */
  get oniceconnectionstatechange(): ((this: RTCPeerConnection, ev: Event) => any) | null {
    return this.peer.oniceconnectionstatechange;
  }
  /**
   * An event handler which specifies a function which is called to handle the iceconnectionstatechange event. This happens whenever the local ICE agent needs to deliver a message to the other peer through the signaling server.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/oniceconnectionstatechange
   */
  set oniceconnectionstatechange(value: ((this: RTCPeerConnection, ev: Event) => any) | null) {
    this.peer.oniceconnectionstatechange = value;
  }

  /**
   * An event handler which specifies a function which is called to handle the icegatheringstatechange event. This happens when the ICE gathering state changes.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicegatheringstatechange
   */
  get onicegatheringstatechange(): ((this: RTCPeerConnection, ev: Event) => any) | null {
    return this.peer.onicegatheringstatechange;
  }
  /**
   * An event handler which specifies a function which is called to handle the icegatheringstatechange event. This happens when the ICE gathering state changes.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicegatheringstatechange
   */
  set onicegatheringstatechange(value: ((this: RTCPeerConnection, ev: Event) => any) | null) {
    this.peer.onicegatheringstatechange = value;
  }

  /**
   * An event handler which specifies a function which is called to handle the negotiationneeded event. This event is fired when a change has occurred which requires session negotiation. This negotiation should be carried out as the offerer, because some session changes cannot be negotiated as the answerer.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onnegotiationneeded
   */
  get onnegotiationneeded(): ((this: RTCPeerConnection, ev: Event) => any) | null {
    return this.peer.onnegotiationneeded;
  }
  /**
   * An event handler which specifies a function which is called to handle the negotiationneeded event. This event is fired when a change has occurred which requires session negotiation. This negotiation should be carried out as the offerer, because some session changes cannot be negotiated as the answerer.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onnegotiationneeded
   */
  set onnegotiationneeded(value: ((this: RTCPeerConnection, ev: Event) => any) | null) {
    this.peer.onnegotiationneeded = value;
  }

  /**
   * An event handler which specifies a function which is called to handle the signalingstatechange event. The function receives as input the event object of type Event; this event is sent when the peer connection's signalingState changes, which may happen either because of a call to setLocalDescription() or to setRemoteDescription().
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange
   */
  get onsignalingstatechange(): ((this: RTCPeerConnection, ev: Event) => any) | null {
    return this.peer.onsignalingstatechange;
  }
  /**
   * An event handler which specifies a function which is called to handle the signalingstatechange event. The function receives as input the event object of type Event; this event is sent when the peer connection's signalingState changes, which may happen either because of a call to setLocalDescription() or to setRemoteDescription().
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onsignalingstatechange
   */
  set onsignalingstatechange(value: ((this: RTCPeerConnection, ev: Event) => any) | null) {
    this.peer.onsignalingstatechange = value;
  }

  /**
   * An event handler which specifies a function which is called to handle the track event. The function receives as input the event object, of type RTCTrackEvent; this event is sent when a new incoming MediaStreamTrack has been created and associated with an RTCRtpReceiver object which has been added to the set of receivers on the connection.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ontrack
   */
  get ontrack(): ((this: RTCPeerConnection, ev: RTCTrackEvent) => any) | null {
    return this.peer.ontrack;
  }
  /**
   * An event handler which specifies a function which is called to handle the track event. The function receives as input the event object, of type RTCTrackEvent; this event is sent when a new incoming MediaStreamTrack has been created and associated with an RTCRtpReceiver object which has been added to the set of receivers on the connection.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/ontrack
   */
  set ontrack(value: ((this: RTCPeerConnection, ev: RTCTrackEvent) => any) | null) {
    this.peer.ontrack = value;
  }

  /** Event Handling */

  /**
   * Sets up a function that will be called whenever a specified event is delivered to the target.
   * @param type A case-sensitive string representing the event type to listen for.
   * @param listener The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs. This must be an object implementing the EventListener interface, or a JavaScript function. See The event listener callback for details on the callback itself.
   * @param options An options object specifies characteristics about the event listener.
   */
  addEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
    this.peer.addEventListener(type, listener, options);
  }

  /**
   * Removes an event listener previously registered with addEventListener().
   * @param type A string which specifies the type of event for which to remove an event listener.
   * @param listener The EventListener function of the event handler to remove from the event target.
   * @param options An options object that specifies characteristics about the event listener.
   */
  removeEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | EventListenerOptions): void {
    this.peer.removeEventListener(type, listener, options);
  }

  /**
   * Dispatches an Event at the specified EventTarget, (synchronously) invoking the affected EventListeners in the appropriate order. The normal event processing rules (including the capturing and optional bubbling phase) also apply to events dispatched manually with dispatchEvent().
   * @param event The Event object to be dispatched.
   * @returns The return value is false if event is cancelable and at least one of the event handlers which received event called Event.preventDefault(). Otherwise it returns true.
   */
  dispatchEvent(event: Event): boolean {
    return this.peer.dispatchEvent(event);
  }
}
