function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://niche-app-liart.vercel.app';
  const BASE_OWNER_ADDRESS = process.env.NEXT_PUBLIC_BASE_OWNER_ADDRESS || '0x';

  // Account association credentials - generate these for your Farcaster account
  const ACCOUNT_ASSOCIATION_HEADER = process.env.ACCOUNT_ASSOCIATION_HEADER || "";
  const ACCOUNT_ASSOCIATION_PAYLOAD = process.env.ACCOUNT_ASSOCIATION_PAYLOAD || "";
  const ACCOUNT_ASSOCIATION_SIGNATURE = process.env.ACCOUNT_ASSOCIATION_SIGNATURE || "";

  const manifest = {
    accountAssociation: {
      header: ACCOUNT_ASSOCIATION_HEADER,
      payload: ACCOUNT_ASSOCIATION_PAYLOAD,
      signature: ACCOUNT_ASSOCIATION_SIGNATURE
    },
    frame: {
      version: "1",
      name: "Find Your Niche",
      homeUrl: URL,
      iconUrl: `${URL}/IMG_3411.jpeg`,
      imageUrl: `${URL}/IMG_3411.jpeg`,
      splashImageUrl: `${URL}/IMG_3411.jpeg`,
      splashBackgroundColor: "#0f172a",
      buttonTitle: "Launch App",
      webhookUrl: `${URL}/api/webhook`,
      subtitle: "Trade creator coins on Base",
      description: "Trade creator coins and content coins on the Niche platform. Every post becomes an instantly tradeable cryptocurrency token on Base network.",
      screenshotUrls: [
        `${URL}/IMG_3411.jpeg`
      ],
      primaryCategory: "social",
      tagline: "Every post is a tradeable token",
      ogTitle: "Find Your Niche - Creator Economy Platform",
      ogDescription: "Trade creator coins and content coins. Every post becomes an instantly tradeable cryptocurrency token on Base.",
      ogImageUrl: `${URL}/IMG_3411.jpeg`,
      castShareUrl: URL
    }
  };

  return Response.json(manifest);
}
