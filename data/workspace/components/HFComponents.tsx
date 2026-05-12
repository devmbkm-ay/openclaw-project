/**
 * React Components for Hugging Face Integration
 * File: data/workspace/components/HFComponents.tsx
 *
 * Ready-to-use components for common HF tasks
 */

"use client";

import React, { useState } from "react";

// ============================================================
// 1. Text Generator Component
// ============================================================

export function TextGeneratorComponent() {
    const [prompt, setPrompt] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/hf-generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    maxTokens: 256,
                    temperature: 0.7,
                }),
            });

            if (!response.ok) throw new Error("Generation failed");

            const data = await response.json();
            setOutput(data.generated_text);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤗 Text Generator</h2>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                className="w-full p-3 border rounded mb-4"
                rows={3}
            />

            <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                {loading ? "Generating..." : "Generate"}
            </button>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {output && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <p className="text-sm font-semibold mb-2">Output:</p>
                    <p>{output}</p>
                </div>
            )}
        </div>
    );
}

// ============================================================
// 2. Sentiment Analyzer Component
// ============================================================

export function SentimentAnalyzerComponent() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/hf-classify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) throw new Error("Analysis failed");

            const data = await response.json();
            setResult(data.classification && data.classification[0]);
        } catch (err: any) {
            setError(err.message || "Analysis failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">💭 Sentiment Analyzer</h2>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to analyze..."
                className="w-full p-3 border rounded mb-4"
                rows={3}
            />

            <button
                onClick={handleAnalyze}
                disabled={loading || !text}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            >
                {loading ? "Analyzing..." : "Analyze"}
            </button>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {result && (
                <div className="mt-4 p-4 bg-blue-50 rounded">
                    <p className="font-semibold">{result.label}</p>
                    <p className="text-sm text-gray-600">
                        Confidence: {(result.score * 100).toFixed(1)}%
                    </p>
                </div>
            )}
        </div>
    );
}

// ============================================================
// 3. Image Generator Component
// ============================================================

export function ImageGeneratorComponent() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/hf-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    guidanceScale: 7.5,
                }),
            });

            if (!response.ok) throw new Error("Image generation failed");

            const data = await response.json();
            setImage(data.image);
        } catch (err: any) {
            setError(err.message || "Image generation failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🖼️ Image Generator</h2>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want..."
                className="w-full p-3 border rounded mb-4"
                rows={3}
            />

            <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
                {loading ? "Generating..." : "Generate Image"}
            </button>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {image && (
                <div className="mt-4">
                    <img src={image} alt="Generated" className="max-w-full rounded" />
                </div>
            )}
        </div>
    );
}

// ============================================================
// 4. Text Summarizer Component
// ============================================================

export function TextSummarizerComponent() {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSummarize = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/hf-summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) throw new Error("Summarization failed");

            const data = await response.json();
            setSummary(data.summary);
        } catch (err: any) {
            setError(err.message || "Summarization failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📝 Text Summarizer</h2>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste text to summarize (min 50 chars)..."
                className="w-full p-3 border rounded mb-4"
                rows={5}
            />

            <div className="flex gap-2">
                <button
                    onClick={handleSummarize}
                    disabled={loading || text.length < 50}
                    className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                >
                    {loading ? "Summarizing..." : "Summarize"}
                </button>
            </div>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {summary && (
                <div className="mt-4 p-4 bg-yellow-50 rounded">
                    <p className="text-sm font-semibold mb-2">Summary:</p>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}

// ============================================================
// 5. Question Answerer Component
// ============================================================

export function QuestionAnswererComponent() {
    const [context, setContext] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAsk = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/hf-qa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ context, question }),
            });

            if (!response.ok) throw new Error("Question answering failed");

            const data = await response.json();
            setAnswer(data.answer);
        } catch (err: any) {
            setError(err.message || "Question answering failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">❓ Question Answerer</h2>

            <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Paste context/document..."
                className="w-full p-3 border rounded mb-4"
                rows={4}
            />

            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                className="w-full p-3 border rounded mb-4"
            />

            <button
                onClick={handleAsk}
                disabled={loading || !context || !question}
                className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
            >
                {loading ? "Answering..." : "Get Answer"}
            </button>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {answer && (
                <div className="mt-4 p-4 bg-red-50 rounded">
                    <p className="text-lg font-semibold">{answer}</p>
                </div>
            )}
        </div>
    );
}

// ============================================================
// 6. Dashboard: All Components
// ============================================================

export function HFDashboard() {
    const [activeTab, setActiveTab] = useState("generate");

    const tabs = [
        { id: "generate", label: "Generate", component: TextGeneratorComponent },
        { id: "sentiment", label: "Sentiment", component: SentimentAnalyzerComponent },
        { id: "image", label: "Image", component: ImageGeneratorComponent },
        { id: "summarize", label: "Summarize", component: TextSummarizerComponent },
        { id: "qa", label: "Q&A", component: QuestionAnswererComponent },
    ];

    const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">🤗 Hugging Face Hub</h1>

            <div className="flex gap-2 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === tab.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {ActiveComponent && <ActiveComponent />}
        </div>
    );
}
