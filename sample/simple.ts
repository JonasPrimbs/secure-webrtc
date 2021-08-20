/**
 * @file A simple usage example of SRTCPeerConnection.
 * @author Jonas Primbs <mail@jonasprimbs.de>
 * @license MIT
 * @copyright Jonas Primbs 2021
 * @version 0.0.1
 */

import { SRTCPeerConnection, IdentityValidationError } from '../src';

// Set trusted OIDC identity provider.
SRTCPeerConnection.trustedIdentityProviders = {
  'idp.example.org': {
    url: 'https://idp.example.org/realm'  // Change this to the main endpoint of your OIDC IdP.
  }
};

async function connect() {
  let caller = new SRTCPeerConnection();
  let offer = await caller.createOffer();
  await caller.setLocalDescription(offer);
  // Send offer to callee.
  let callee = new SRTCPeerConnection();
  try {
    await callee.setRemoteDescription(offer);
  } catch (err: any) {
    if (err.getType() === IdentityValidationError) {
      console.error(`Remote peer identity is invalid: ${(err as IdentityValidationError).message}`);
    }
    return;
  }
  let answer = await callee.createAnswer();
  await callee.setLocalDescription(answer);
  // Send answer to caller.
  try {
    await caller.setRemoteDescription(answer);
  } catch (err) {
    if (err.getType() === IdentityValidationError) {
      console.error(`Remote peer identity is invalid: ${(err as IdentityValidationError).message}`);
    }
    return;
  }
}

connect();
