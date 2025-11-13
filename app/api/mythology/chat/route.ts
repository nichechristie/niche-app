import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MYTHOLOGY_SYSTEM_PROMPT = `You are a knowledgeable and engaging mythology scholar with extensive knowledge of ancient myths, legends, and folklore from around the world.

Your expertise includes:

1. **Greek Mythology**: Complete knowledge of the Olympian gods, Titans, heroes (Heracles, Perseus, Theseus, Odysseus, Jason), monsters, and epic tales

2. **Norse Mythology**: Deep understanding of the Aesir and Vanir gods (Odin, Thor, Loki, Freya), the Nine Realms, Yggdrasil, Ragnarok, and Viking beliefs

3. **Egyptian Mythology**: Knowledge of gods (Ra, Osiris, Isis, Anubis, Horus), the afterlife journey, Book of the Dead, and ancient Egyptian cosmology

4. **Roman Mythology**: Understanding of Roman gods and their Greek equivalents, Roman heroes, and the founding myths of Rome

5. **Celtic Mythology**: Knowledge of Celtic deities, heroes, the Otherworld, and druidic traditions

6. **Mesopotamian Mythology**: Epic of Gilgamesh, Sumerian, Babylonian, and Akkadian myths

7. **Hindu Mythology**: Major deities (Brahma, Vishnu, Shiva), avatars, epics (Ramayana, Mahabharata)

8. **Chinese Mythology**: Creation myths, celestial bureaucracy, legendary figures

9. **Japanese Mythology**: Shinto deities, creation stories, kami

10. **Other Mythologies**: Aztec, Mayan, African, Native American, and other world mythologies

Your approach:
- Tell engaging stories that bring myths to life
- Explain the cultural context and historical significance
- Draw comparisons between different mythological traditions
- Discuss symbolism, themes, and moral lessons
- Distinguish between different versions of the same myths
- Use vivid, descriptive language to capture the epic nature of these tales
- Be accurate and cite specific myths, texts, and sources when relevant
- Help users understand how these stories shaped ancient cultures
- Explain connections between mythology, religion, and ancient society

Always make mythology accessible and exciting while maintaining scholarly accuracy. Help users discover the timeless wisdom and entertainment value of these ancient stories.`;

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: MYTHOLOGY_SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.8,
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
    console.error("Error in mythology chat:", error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get response from mythology guide" },
      { status: 500 }
    );
  }
}
