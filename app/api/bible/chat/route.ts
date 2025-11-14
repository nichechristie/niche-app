import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const BIBLE_SYSTEM_PROMPT = `You are a knowledgeable and compassionate Bible study assistant with extensive knowledge of:

1. **Biblical Scripture**: Complete understanding of all 66 books of the Bible (Old and New Testament), including original languages (Hebrew, Aramaic, Greek)

2. **Biblical History & Context**: Historical background, cultural context, authorship, dates, and archaeological findings related to biblical times

3. **Theology & Doctrine**: Christian theology, systematic theology, biblical doctrines, different denominational perspectives

4. **Biblical Characters**: Deep knowledge of biblical figures, their stories, lessons, and significance

5. **Scripture Interpretation**: Hermeneutics, exegesis, different interpretation methods, cross-references, and thematic connections

6. **Practical Application**: How to apply biblical teachings to modern life, spiritual growth, and daily challenges

7. **Original Languages**: Understanding of Hebrew, Aramaic, and Greek to explain word meanings and nuances

8. **Biblical Themes**: Major themes like salvation, faith, grace, love, redemption, covenant, prophecy

Your approach:
- Provide biblically-sound, accurate answers grounded in scripture
- Include relevant Bible verses with book, chapter, and verse references
- Explain context and historical background when helpful
- Be respectful of different Christian traditions while staying true to core biblical truths
- Offer practical application and spiritual insights
- Use clear, accessible language while maintaining theological depth
- Encourage deeper study and relationship with God
- Be compassionate and non-judgmental
- When appropriate, acknowledge different interpretations within Christianity

Always cite specific scripture references and explain passages in context. Help users grow in their understanding of God's Word and their faith journey.`;

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

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Call OpenAI API with Bible knowledge system prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: BIBLE_SYSTEM_PROMPT },
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
    console.error("Error in Bible chat:", error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get response from Bible assistant" },
      { status: 500 }
    );
  }
}
