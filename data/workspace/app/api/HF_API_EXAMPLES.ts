/* @ts-nocheck - This file contains reference implementations meant to be copied to individual route files */

/**
 * Example API Routes for Hugging Face Integration
 * Copy these to: data/workspace/app/api/hf-[action]/route.ts
 *
 * These are reference implementations - copy the handler code to your individual
 * route files. They are not used directly in this file, only as examples.
 *
 * Examples provided for:
 * - /api/hf-generate - Text generation
 * - /api/hf-classify - Sentiment/intent classification
 * - /api/hf-embed - Vector embeddings
 * - /api/hf-image - Image generation
 * - /api/hf-summarize - Text summarization
 */

// ===============================================
// CONSOLIDATED IMPORTS (use as needed for each route)
// ===============================================

import { NextRequest, NextResponse } from "next/server";

// Hugging Face functions
import {
    generateText,
    classifyText,
    getEmbedding,
    generateImage,
    summarizeText,
    questionAnswering,
    extractEntities,
    classifyImage,
    detectObjects,
    transcribeAudio,
    synthesizeSpeech,
    answerFromDocument,
} from "@/lib/huggingface";

// ===============================================
// 1. TEXT GENERATION ENDPOINT
// data/workspace/app/api/hf-generate/route.ts
// ===============================================
// For your route file, rename this to: export async function POST()

async function generateHandler(req: NextRequest) {
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

// ===============================================
// 2. TEXT CLASSIFICATION ENDPOINT
// data/workspace/app/api/hf-classify/route.ts
// For your route file, rename this to: export async function POST()

async function classifyHandler(req: NextRequest) {
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

// ===============================================
// 3. EMBEDDINGS ENDPOINT
// data/workspace/app/api/hf-embed/route.ts
// For your route file, rename this to: export async function POST()

async function embedHandler(req: NextRequest) {
    try {
        const { text, model } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        const embedding = await getEmbedding(text, { model });

        return NextResponse.json({
            embedding,
            dimension: embedding.length,
            text: text.substring(0, 100) + "..."
        });
    } catch (error: any) {
        console.error("Embedding error:", error);
        return NextResponse.json(
            { error: error.message || "Embedding failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 4. IMAGE GENERATION ENDPOINT
// data/workspace/app/api/hf-image/route.ts
// For your route file, rename this to: export async function POST()

async function imageGenerationHandler(req: NextRequest) {
    try {
        const { prompt, model, negativePrompt, guidanceScale } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const imageBlob = await generateImage(prompt, {
            model,
            negativePrompt,
            guidanceScale,
        });

        // Convert blob to base64 for JSON response
        const arrayBuffer = await (imageBlob as unknown as Blob).arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        return NextResponse.json({
            image: `data:image/jpeg;base64,${base64}`,
            prompt,
            model,
        });
    } catch (error: any) {
        console.error("Image generation error:", error);
        return NextResponse.json(
            { error: error.message || "Image generation failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 5. SUMMARIZATION ENDPOINT
// data/workspace/app/api/hf-summarize/route.ts
// For your route file, rename this to: export async function POST()

async function summarizeHandler(req: NextRequest) {
    try {
        const { text, model, maxLength, minLength } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        if (text.length < 50) {
            return NextResponse.json(
                { error: "Text must be at least 50 characters" },
                { status: 400 }
            );
        }

        const result = await summarizeText(text, {
            model,
            maxLength,
            minLength,
        });

        return NextResponse.json({
            summary: result?.summary_text || result,
            original_length: text.length,
        });
    } catch (error: any) {
        console.error("Summarization error:", error);
        return NextResponse.json(
            { error: error.message || "Summarization failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 6. QUESTION ANSWERING ENDPOINT
// data/workspace/app/api/hf-qa/route.ts
// For your route file, rename this to: export async function POST()

async function questionAnswerHandler(req: NextRequest) {
    try {
        const { context, question, model } = await req.json();

        if (!context || !question) {
            return NextResponse.json(
                { error: "Context and question are required" },
                { status: 400 }
            );
        }

        const result = await questionAnswering(context, question, { model });

        return NextResponse.json({
            answer: result?.answer || result,
            score: result?.score,
            context: context.substring(0, 200) + "...",
        });
    } catch (error: any) {
        console.error("QA error:", error);
        return NextResponse.json(
            { error: error.message || "Question answering failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 7. ENTITY EXTRACTION ENDPOINT
// data/workspace/app/api/hf-entities/route.ts
// For your route file, rename this to: export async function POST()

async function entityExtractionHandler(req: NextRequest) {
    try {
        const { text, model } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        const entities = await extractEntities(text, { model });

        return NextResponse.json({
            entities,
            text: text.substring(0, 200),
        });
    } catch (error: any) {
        console.error("Entity extraction error:", error);
        return NextResponse.json(
            { error: error.message || "Entity extraction failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 8. IMAGE CLASSIFICATION ENDPOINT
// data/workspace/app/api/hf-classify-image/route.ts
// For your route file, rename this to: export async function POST()

async function imageClassificationHandler(req: NextRequest) {
    try {
        const { imageData, model } = await req.json();

        if (!imageData) {
            return NextResponse.json(
                { error: "Image data is required" },
                { status: 400 }
            );
        }

        const result = await classifyImage(imageData, { model });

        return NextResponse.json({
            classifications: result,
            topClass: result[0],
        });
    } catch (error: any) {
        console.error("Image classification error:", error);
        return NextResponse.json(
            { error: error.message || "Image classification failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 9. OBJECT DETECTION ENDPOINT
// data/workspace/app/api/hf-detect/route.ts
// For your route file, rename this to: export async function POST()

async function objectDetectionHandler(req: NextRequest) {
    try {
        const { imageData, model } = await req.json();

        if (!imageData) {
            return NextResponse.json(
                { error: "Image data is required" },
                { status: 400 }
            );
        }

        const result = await detectObjects(imageData, { model });

        return NextResponse.json({
            detections: result,
            count: result.length,
        });
    } catch (error: any) {
        console.error("Object detection error:", error);
        return NextResponse.json(
            { error: error.message || "Object detection failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 10. AUDIO TRANSCRIPTION ENDPOINT
// data/workspace/app/api/hf-transcribe/route.ts
// For your route file, rename this to: export async function POST()

async function transcribeHandler(req: NextRequest) {
    try {
        const { audioData, model } = await req.json();

        if (!audioData) {
            return NextResponse.json(
                { error: "Audio data is required" },
                { status: 400 }
            );
        }

        const result = await transcribeAudio(audioData, { model });

        return NextResponse.json({
            transcript: result?.text || result,
        });
    } catch (error: any) {
        console.error("Transcription error:", error);
        return NextResponse.json(
            { error: error.message || "Transcription failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 11. TEXT-TO-SPEECH ENDPOINT
// data/workspace/app/api/hf-tts/route.ts
// For your route file, rename this to: export async function POST()

async function textToSpeechHandler(req: NextRequest) {
    try {
        const { text, model } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        const audioBlob = await synthesizeSpeech(text, { model });

        const arrayBuffer = await (audioBlob as Blob).arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        return NextResponse.json({
            audio: `data:audio/wav;base64,${base64}`,
            text: text.substring(0, 100),
        });
    } catch (error: any) {
        console.error("Text-to-speech error:", error);
        return NextResponse.json(
            { error: error.message || "Text-to-speech failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// 12. DOCUMENT QUESTION ANSWERING ENDPOINT
// data/workspace/app/api/hf-document-qa/route.ts
// For your route file, rename this to: export async function POST()

async function documentQAHandler(req: NextRequest) {
    try {
        const { imageOrUrl, question, model } = await req.json();

        if (!imageOrUrl || !question) {
            return NextResponse.json(
                { error: "Image/URL and question are required" },
                { status: 400 }
            );
        }

        const result = await answerFromDocument(imageOrUrl, question, { model });

        return NextResponse.json({
            answer: result?.answer || result,
        });
    } catch (error: any) {
        console.error("Document QA error:", error);
        return NextResponse.json(
            { error: error.message || "Document QA failed" },
            { status: 500 }
        );
    }
}

// ===============================================
// NOTE: For POST requests, use this client-side code:
// ===============================================

/*
const response = await fetch('/api/hf-generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Hello, how are you?',
    maxTokens: 100,
    temperature: 0.7,
  }),
});

const data = await response.json();
console.log(data);
*/
