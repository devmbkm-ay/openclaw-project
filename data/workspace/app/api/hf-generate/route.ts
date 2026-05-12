import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/huggingface";

/**
 * TEXT GENERATION ENDPOINT
 * POST /api/hf-generate
 * 
 * Request body:
 * {
 *   "prompt": "Your text here",
 *   "maxTokens": 100,
 *   "temperature": 0.7
 * }
 */
export async function POST(req: NextRequest) {
    try {
        const { prompt, model, maxTokens, temperature } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const result = await generateText(prompt, {
            model,
            maxTokens,
            temperature,
        });

        return NextResponse.json({ generated_text: result });
    } catch (error: any) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { error: error.message || "Generation failed" },
            { status: 500 }
        );
    }
}
