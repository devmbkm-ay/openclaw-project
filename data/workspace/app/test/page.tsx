'use client';

import React, { useState } from 'react';

export default function TestPage() {
    const [activeTab, setActiveTab] = useState('generate');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Generate Tab
    const [generatePrompt, setGeneratePrompt] = useState('Hello, how are you?');
    const [generateMaxTokens, setGenerateMaxTokens] = useState(100);
    const [generateTemp, setGenerateTemp] = useState(0.7);

    // Classify Tab
    const [classifyText, setClassifyText] = useState('I love this product!');

    const testGenerate = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/hf-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: generatePrompt,
                    maxTokens: generateMaxTokens,
                    temperature: generateTemp,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const testClassify = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/hf-classify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: classifyText,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            <h1>🤗 Hugging Face Integration Test</h1>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('generate')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: activeTab === 'generate' ? '#0070f3' : '#e0e0e0',
                        color: activeTab === 'generate' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Text Generation
                </button>
                <button
                    onClick={() => setActiveTab('classify')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: activeTab === 'classify' ? '#0070f3' : '#e0e0e0',
                        color: activeTab === 'classify' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Text Classification
                </button>
            </div>

            {/* Text Generation Tab */}
            {activeTab === 'generate' && (
                <div style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '0.5rem' }}>
                    <h2>Text Generation</h2>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            Prompt:
                        </label>
                        <textarea
                            value={generatePrompt}
                            onChange={(e) => setGeneratePrompt(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                height: '100px',
                                fontFamily: 'monospace',
                            }}
                            placeholder="Enter your prompt..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Max Tokens: {generateMaxTokens}
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="512"
                                value={generateMaxTokens}
                                onChange={(e) => setGenerateMaxTokens(parseInt(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Temperature: {generateTemp.toFixed(2)}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={generateTemp}
                                onChange={(e) => setGenerateTemp(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={testGenerate}
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            )}

            {/* Text Classification Tab */}
            {activeTab === 'classify' && (
                <div style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '0.5rem' }}>
                    <h2>Text Classification (Sentiment Analysis)</h2>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            Text:
                        </label>
                        <textarea
                            value={classifyText}
                            onChange={(e) => setClassifyText(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                height: '80px',
                                fontFamily: 'monospace',
                            }}
                            placeholder="Enter text to classify..."
                        />
                    </div>

                    <button
                        onClick={testClassify}
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        {loading ? 'Classifying...' : 'Classify'}
                    </button>
                </div>
            )}

            {/* Results */}
            {result && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#f0f8ff',
                    border: '1px solid #0070f3',
                    borderRadius: '0.375rem',
                }}>
                    <h3>✅ Result:</h3>
                    <pre style={{ 
                        overflow: 'auto', 
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '0.25rem',
                        fontFamily: 'monospace',
                    }}>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}

            {/* Errors */}
            {error && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#ffe0e0',
                    border: '1px solid #d32f2f',
                    borderRadius: '0.375rem',
                    color: '#d32f2f',
                }}>
                    <h3>❌ Error:</h3>
                    <p>{error}</p>
                </div>
            )}

            {/* Status */}
            {loading && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#fff8e1',
                    border: '1px solid #f57c00',
                    borderRadius: '0.375rem',
                    color: '#f57c00',
                }}>
                    <p>⏳ Loading... (This may take a few seconds on first request)</p>
                </div>
            )}
        </div>
    );
}
