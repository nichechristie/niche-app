"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";
import { useState } from "react";
import { FarcasterProvider } from "@/components/FarcasterProvider";
import { CartProvider } from "./contexts/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <FarcasterProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </FarcasterProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
