import { NextRequest, NextResponse } from "next/server";
import { BasescanAPI } from "@/lib/basescan";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    if (!address || address.length !== 42 || !address.startsWith("0x")) {
      return NextResponse.json(
        { error: "Invalid contract address" },
        { status: 400 }
      );
    }

    // Fetch token info from Basescan
    const tokenInfo = await BasescanAPI.getTokenInfo(address);

    if (!tokenInfo) {
      return NextResponse.json(
        { error: "Token not found or not verified" },
        { status: 404 }
      );
    }

    // Get additional data
    const isVerified = await BasescanAPI.isContractVerified(address);

    return NextResponse.json({
      success: true,
      token: {
        ...tokenInfo,
        verified: isVerified,
        basescanUrl: `https://basescan.org/token/${address}`,
      },
    });
  } catch (error) {
    console.error("Error fetching token data:", error);
    return NextResponse.json(
      { error: "Failed to fetch token data" },
      { status: 500 }
    );
  }
}
