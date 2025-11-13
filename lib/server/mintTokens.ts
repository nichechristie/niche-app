import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { NICHE_TOKEN_ADDRESS, NICHE_TOKEN_ABI, parseNicheTokens } from "../nicheToken";

/**
 * Mints NICHE tokens to a user's address
 * Requires NICHE_TOKEN_OWNER_PRIVATE_KEY environment variable
 *
 * @param toAddress - Recipient address
 * @param amount - Amount of NICHE tokens (as string, e.g., "10")
 * @returns Transaction hash if successful
 */
export async function mintNicheTokens(
  toAddress: string,
  amount: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    // Check for required environment variable
    const privateKey = process.env.NICHE_TOKEN_OWNER_PRIVATE_KEY;

    if (!privateKey) {
      console.warn("NICHE_TOKEN_OWNER_PRIVATE_KEY not set. Skipping token minting.");
      return {
        success: false,
        error: "Token minting not configured. Please set NICHE_TOKEN_OWNER_PRIVATE_KEY environment variable.",
      };
    }

    // Create account from private key
    const account = privateKeyToAccount(privateKey as `0x${string}`);

    // Create wallet client for writing to the blockchain
    const walletClient = createWalletClient({
      account,
      chain: base,
      transport: http(),
    });

    // Create public client for reading from the blockchain
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    // Check if the account is the owner
    const owner = await publicClient.readContract({
      address: NICHE_TOKEN_ADDRESS,
      abi: NICHE_TOKEN_ABI,
      functionName: "owner",
    });

    if (owner.toLowerCase() !== account.address.toLowerCase()) {
      console.error("Account is not the contract owner");
      return {
        success: false,
        error: "Only the contract owner can mint tokens",
      };
    }

    // Convert amount to wei (18 decimals)
    const amountInWei = parseNicheTokens(amount);

    console.log(`Minting ${amount} NICHE tokens to ${toAddress}...`);

    // Call mint function
    const hash = await walletClient.writeContract({
      address: NICHE_TOKEN_ADDRESS,
      abi: NICHE_TOKEN_ABI,
      functionName: "mint",
      args: [toAddress as `0x${string}`, amountInWei],
    });

    // Wait for transaction confirmation
    await publicClient.waitForTransactionReceipt({ hash });

    console.log(`Successfully minted ${amount} NICHE tokens to ${toAddress}. TX: ${hash}`);

    return {
      success: true,
      txHash: hash,
    };
  } catch (error: any) {
    console.error("Error minting tokens:", error);
    return {
      success: false,
      error: error.message || "Failed to mint tokens",
    };
  }
}
