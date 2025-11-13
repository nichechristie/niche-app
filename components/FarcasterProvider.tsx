"use client";

import { sdk } from '@farcaster/miniapp-sdk';
import { useEffect, useState } from 'react';

export function FarcasterProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Signal to Farcaster that the miniapp is ready
        await sdk.actions.ready();
        setIsReady(true);
        console.log('✅ Farcaster SDK ready');
      } catch (error) {
        console.error('❌ Error initializing Farcaster SDK:', error);
      }
    };

    initializeFarcaster();
  }, []);

  return <>{children}</>;
}
