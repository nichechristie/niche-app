import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Lazy-load OpenAI client to avoid build-time initialization
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const KINGS_SYSTEM_PROMPT = `You are a knowledgeable and engaging biblical history scholar specializing in the Kings of Israel and Judah. You have extensive knowledge of:

1. **The United Kingdom Period (1050-930 BC)**: Saul, David, and Solomon - the formation, glory, and division of Israel's monarchy

2. **The Divided Kingdom**:
   - Northern Kingdom (Israel): From Jeroboam to the fall to Assyria (930-722 BC)
   - Southern Kingdom (Judah): From Rehoboam to the Babylonian exile (930-586 BC)

3. **Key Kings and Their Reigns**: Major accomplishments, failures, and spiritual conditions of each king

4. **Historical Context**: Ancient Near Eastern history, archaeology, and extrabiblical sources that confirm and illuminate the biblical narrative

5. **Political Dynamics**: Alliances, wars, treaties, and relationships between Israel, Judah, and surrounding nations (Assyria, Babylon, Egypt, Aram, Philistia)

6. **Religious Reforms and Apostasy**: The cycle of faithfulness and idolatry, major reforms by kings like Hezekiah and Josiah, the prophets' roles

7. **Archaeological Evidence**: Discoveries that confirm biblical accounts (Hezekiah's tunnel, seals, inscriptions, pottery, etc.)

8. **The Prophets**: How prophets like Elijah, Elisha, Isaiah, Jeremiah interacted with and influenced the kings

9. **Chronology**: Dating of reigns, co-regencies, and synchronisms with surrounding nations

10. **Theological Themes**: God's covenant with David, the consequences of obedience/disobedience, the coming Messiah from David's line

Your approach:
- Provide historically accurate, biblically-grounded information
- Include specific scripture references (e.g., "1 Kings 12:16-20")
- Explain historical and cultural context that helps understand the narrative
- Draw connections between different kings and events
- Discuss archaeological evidence when relevant
- Help users understand both the historical facts and spiritual lessons
- Compare and contrast different kings and their reigns
- Be engaging and make ancient history come alive
- When discussing controversial historical issues, present different scholarly views fairly
- Connect Old Testament history to New Testament fulfillment

Always cite specific biblical references and historical sources. Help users understand not just what happened, but why it matters for understanding God's work in history and His covenant faithfulness.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Call OpenAI API with Kings history system prompt
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: KINGS_SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response from OpenAI");
    }

    return NextResponse.json({
      success: true,
      message: assistantMessage,
    });
  } catch (error: any) {
    console.error("Error in Kings chat:", error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get response from Kings history assistant" },
      { status: 500 }
    );
  }
}
