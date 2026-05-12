import { NextRequest, NextResponse } from "next/server";
import { classifyText } from "@/lib/huggingface";

/**
 * TEXT CLASSIFICATION ENDPOINT
 * POST /api/hf-classify
 * 
 * Request body:
 * {
 *   "text": "I love this product!",
 *   "model": "distilbert-base-uncased-finetuned-sst-2-english"
 * }
 */
export async function POST(req: NextRequest) {
    try {
        const { text, model } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        const result = await classifyText(text, { model });

        return NextResponse.json({ classification: result });
    } catch (error: any) {
        console.error("Classification error:", error);
        return NextResponse.json(
            { error: error.message || "Classification failed" },
            { status: 500 }
        );
    }
}
