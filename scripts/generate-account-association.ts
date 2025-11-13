/**
 * Script to generate Farcaster account association credentials
 *
 * This creates the header, payload, and signature needed for the manifest
 * to prove ownership of your Farcaster account and domain.
 *
 * Requirements:
 * 1. Your Farcaster FID (Farcaster ID)
 * 2. Your custody address (the address that owns your FID)
 * 3. A private key that can sign on behalf of your FID
 * 4. Your domain (e.g., niche-app.vercel.app)
 */

import { createPublicClient, http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';

async function generateAccountAssociation() {
  console.log('🔐 Farcaster Account Association Generator\n');

  // Configuration - UPDATE THESE VALUES
  const config = {
    fid: 0, // Your Farcaster FID
    custodyAddress: '0x', // Your Farcaster custody address
    privateKey: '0x', // Private key that controls your FID
    domain: 'localhost:3005', // Your domain (use production domain for deployment)
  };

  if (config.fid === 0 || config.custodyAddress === '0x' || config.privateKey === '0x') {
    console.error('❌ Please update the config values in this script first!\n');
    console.log('You need to provide:');
    console.log('- fid: Your Farcaster ID');
    console.log('- custodyAddress: Your Farcaster custody address');
    console.log('- privateKey: Private key for signing');
    console.log('- domain: Your app domain\n');
    return;
  }

  try {
    const account = privateKeyToAccount(config.privateKey as `0x${string}`);

    // Create header (base64 encoded JSON)
    const headerObj = {
      fid: config.fid,
      type: 'custody',
      key: account.address,
    };
    const header = Buffer.from(JSON.stringify(headerObj)).toString('base64');

    // Create payload (base64 encoded JSON)
    const payloadObj = {
      domain: config.domain,
    };
    const payload = Buffer.from(JSON.stringify(payloadObj)).toString('base64');

    // Create message to sign
    const message = `${header}.${payload}`;

    // Sign the message
    const signature = await account.signMessage({
      message,
    });

    console.log('✅ Account Association Generated!\n');
    console.log('Add these to your .env.local file:\n');
    console.log(`ACCOUNT_ASSOCIATION_HEADER=${header}`);
    console.log(`ACCOUNT_ASSOCIATION_PAYLOAD=${payload}`);
    console.log(`ACCOUNT_ASSOCIATION_SIGNATURE=${signature}\n`);

    console.log('📋 Full manifest accountAssociation object:\n');
    console.log(JSON.stringify({
      accountAssociation: {
        header,
        payload,
        signature,
      }
    }, null, 2));

  } catch (error) {
    console.error('❌ Error generating account association:', error);
  }
}

generateAccountAssociation();
