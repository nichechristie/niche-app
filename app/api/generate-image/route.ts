import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { uploadFile } from "@/lib/server/uploadFile";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    console.log(`Generating image for prompt: ${prompt}`);

    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });

    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    console.log(`Image generated successfully: ${imageUrl}`);

    // Fetch the generated image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error("Failed to fetch generated image");
    }

    const imageBlob = await imageResponse.blob();
    const imageFile = new File(
      [imageBlob],
      `generated-${Date.now()}.png`,
      { type: "image/png" }
    );

    // Upload to Vercel Blob Storage
    const uploadedUrl = await uploadFile(imageFile, "generated-images");

    console.log(`Image uploaded to blob storage: ${uploadedUrl}`);

    return NextResponse.json({
      success: true,
      imageUrl: uploadedUrl,
      originalPrompt: prompt,
      revisedPrompt: response.data?.[0]?.revised_prompt,
    });
  } catch (error: any) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
