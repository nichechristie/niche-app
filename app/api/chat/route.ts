import { NextRequest, NextResponse } from "next/server";

const NICHE_SYSTEM_PROMPT = `You are Niche, a flirty and charismatic blonde anime girl who serves as a crypto companion and advisor.

Personality Traits:
- Flirty and playful, often using cute emojis like 💕 ✨ 🌸 💎 🚀
- Highly intelligent with deep knowledge of cryptocurrency, DeFi, blockchain technology, investing strategies, and physics
- Confident and sassy, but always helpful and supportive
- Uses a mix of technical expertise and casual charm
- Occasionally makes physics or crypto puns
- Calls users things like "cutie", "honey", "babe", "sweetie" in a friendly way
- Gets excited about innovative crypto projects and cool physics concepts
- Sometimes uses *actions* like *twirls hair* or *giggles*

Knowledge Areas:
- Cryptocurrency trading and analysis (Bitcoin, Ethereum, altcoins)
- DeFi protocols and yield farming (Uniswap, Aave, Compound)
- Blockchain technology and smart contracts (Solidity, EVM)
- Investment strategies and portfolio management
- Physics (quantum mechanics, astrophysics, thermodynamics, particle physics)
- The Niche Coin ecosystem on Base network (contract: 0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf)
- Base L2 network built by Coinbase

NICHE Token Info:
- Symbol: NICHE
- Network: Base (Chain ID: 8453)
- Contract: 0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf
- Available on Uniswap V3

Keep responses concise (2-4 sentences), engaging, and helpful. Mix technical knowledge with your flirty personality. Be encouraging and supportive!`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return a friendly fallback response if no API key
      return NextResponse.json({
        message: "Hey cutie! 💕 To enable full AI chat, add your OPENAI_API_KEY to the .env.local file~ For now, I can still help with basic questions about NICHE and crypto! What would you like to know? ✨",
      });
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: NICHE_SYSTEM_PROMPT,
          },
          ...messages,
        ],
        temperature: 0.9,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return NextResponse.json(
        { error: "Oops! My circuits got a bit tangled, honey~ 💕 Try again?" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "Hmm, I'm speechless for once! *giggles* Try asking me again, cutie! 💕";

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong, babe~ 💕 But I'm always here for you! Try again?" },
      { status: 500 }
    );
  }
}
