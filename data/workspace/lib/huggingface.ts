/**
 * Hugging Face Integration Utilities
 * data/workspace/lib/huggingface.ts
 *
 * Provides reusable functions for common HF tasks
 */

import { HfInference } from "@huggingface/inference";

// Initialize HF client
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

// ========================================
// Text Summarization (Alternative to Generation)
// ========================================

export async function generateText(prompt: string, options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    topP?: number;
}) {
    try {
        // Using summarization instead since text-generation has limited providers on free API
        const result = await hf.summarization({
            inputs: prompt,
            model: options?.model || process.env.HF_TEXT_MODEL || "facebook/bart-large-cnn",
            parameters: {
                max_length: options?.maxTokens || 130,
                min_length: 30,
            },
        });

        return result;
    } catch (error) {
        console.error("[HF] Text generation/summarization failed:", error);
        throw error;
    }
}

// ========================================
// Text Classification (Sentiment, Intent)
// ========================================

export async function classifyText(text: string, options?: {
    model?: string;
}) {
    try {
        const result = await hf.textClassification({
            inputs: text,
            model: options?.model || "distilbert-base-uncased-finetuned-sst-2-english",
        });

        return result;
    } catch (error) {
        console.error("[HF] Text classification failed:", error);
        throw error;
    }
}

// ========================================
// Question Answering
// ========================================

export async function questionAnswering(context: string, question: string, options?: {
    model?: string;
}) {
    try {
        const result = await hf.questionAnswering({
            inputs: {
                context,
                question,
            },
            model: options?.model || "deepset/roberta-base-squad2",
        });

        return result;
    } catch (error) {
        console.error("[HF] Question answering failed:", error);
        throw error;
    }
}

// ========================================
// Named Entity Recognition (NER)
// ========================================

export async function extractEntities(text: string, options?: {
    model?: string;
}) {
    try {
        const result = await hf.tokenClassification({
            inputs: text,
            model: options?.model || "dslim/bert-base-NER",
        });

        return result;
    } catch (error) {
        console.error("[HF] Entity extraction failed:", error);
        throw error;
    }
}

// ========================================
// Embeddings (Vector Representations)
// ========================================

export async function getEmbedding(text: string, options?: {
    model?: string;
}) {
    try {
        const result = await hf.featureExtraction({
            inputs: text,
            model: options?.model || process.env.HF_EMBEDDING_MODEL || "sentence-transformers/all-MiniLM-L6-v2",
        });

        return result;
    } catch (error) {
        console.error("[HF] Embedding generation failed:", error);
        throw error;
    }
}

// ========================================
// Image Generation
// ========================================

export async function generateImage(prompt: string, options?: {
    model?: string;
    negativePrompt?: string;
    numInferenceSteps?: number;
    guidanceScale?: number;
}) {
    try {
        const imageBlob = await hf.textToImage({
            inputs: prompt,
            model: options?.model || process.env.HF_IMAGE_MODEL || "stabilityai/stable-diffusion-3-medium",
            parameters: {
                negative_prompt: options?.negativePrompt,
                num_inference_steps: options?.numInferenceSteps || 20,
                guidance_scale: options?.guidanceScale || 7.5,
            },
        });

        return imageBlob;
    } catch (error) {
        console.error("[HF] Image generation failed:", error);
        throw error;
    }
}

// ========================================
// Helper: Convert data to Blob
// ========================================

function convertToBlob(data: string | Buffer | Blob | ArrayBuffer): Blob {
    if (data instanceof Blob) return data;
    if (data instanceof ArrayBuffer) return new Blob([data]);
    if (typeof data === "string") {
        if (data.startsWith("http://") || data.startsWith("https://") || data.startsWith("data:")) {
            return new Blob([data]);
        }
        return new Blob([new TextEncoder().encode(data)]);
    }
    if (Buffer.isBuffer(data)) {
        // Convert Node.js Buffer to Uint8Array for browser compatibility
        return new Blob([new Uint8Array(data)]);
    }
    throw new Error("Unsupported data type for Blob conversion");
}

// ========================================
// Image Classification
// ========================================

export async function classifyImage(
    imageData: string | Buffer | Blob | ArrayBuffer,
    options?: { model?: string }
) {
    try {
        const imageBlob = convertToBlob(imageData);

        const result = await hf.imageClassification({
            data: imageBlob,
            model: options?.model || process.env.HF_VISION_MODEL || "google/vit-base-patch16-224",
        });

        return result;
    } catch (error) {
        console.error("[HF] Image classification failed:", error);
        throw error;
    }
}


// ========================================
// Object Detection
// ========================================

export async function detectObjects(imageData: string | Buffer | Blob | ArrayBuffer, options?: {
    model?: string;
}) {
    try {
        const result = await hf.objectDetection({
            data: convertToBlob(imageData),
            model: options?.model || "facebook/detr-resnet-50",
        });

        return result;
    } catch (error) {
        console.error("[HF] Object detection failed:", error);
        throw error;
    }
}

// ========================================
// Document Question Answering (Document Understanding)
// ========================================

export async function answerFromDocument(
    imageOrUrl: string | Buffer | Blob | ArrayBuffer,
    question: string,
    options?: {
        model?: string;
    }
) {
    try {
        const result = await hf.documentQuestionAnswering({
            inputs: {
                image: convertToBlob(imageOrUrl),
                question,
            },
            model: options?.model || "impira/layoutlm-document-qa",
        });

        return result;
    } catch (error) {
        console.error("[HF] Document QA failed:", error);
        throw error;
    }
}

// ========================================
// Speech-to-Text (Automatic Speech Recognition)
// ========================================

export async function transcribeAudio(audioData: string | Buffer | Blob | ArrayBuffer, options?: {
    model?: string;
}) {
    try {
        const result = await hf.automaticSpeechRecognition({
            data: convertToBlob(audioData),
            model: options?.model || "openai/whisper-small",
        });

        return result;
    } catch (error) {
        console.error("[HF] Audio transcription failed:", error);
        throw error;
    }
}

// ========================================
// Text Summarization
// ========================================

export async function summarizeText(text: string, options?: {
    model?: string;
    maxLength?: number;
    minLength?: number;
}) {
    try {
        const result = await hf.summarization({
            inputs: text,
            model: options?.model || "facebook/bart-large-cnn",
            parameters: {
                max_length: options?.maxLength || 130,
                min_length: options?.minLength || 30,
            },
        });

        return result;
    } catch (error) {
        console.error("[HF] Summarization failed:", error);
        throw error;
    }
}

// ========================================
// Text-to-Speech
// ========================================

export async function synthesizeSpeech(text: string, options?: {
    model?: string;
    speaker?: string;
}) {
    try {
        const audioBlob = await hf.textToSpeech({
            inputs: text,
            model: options?.model || "espnet/kan-bayashi_ljspeech_vits",
        });

        return audioBlob;
    } catch (error) {
        console.error("[HF] Text-to-speech failed:", error);
        throw error;
    }
}

// ========================================
// Error Handler Wrapper
// ========================================

export function withErrorHandling(fn: Function) {
    return async (...args: any[]) => {
        try {
            return await fn(...args);
        } catch (error: any) {
            const message = error.message || "Unknown HF error";
            console.error("[HF] Error:", message);

            // Handle common errors
            if (message.includes("401")) {
                throw new Error("Invalid Hugging Face API token");
            }
            if (message.includes("429")) {
                throw new Error("Rate limited by Hugging Face API");
            }
            if (message.includes("503")) {
                throw new Error("Hugging Face model is currently loading");
            }

            throw error;
        }
    };
}
