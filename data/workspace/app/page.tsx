'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1>🚀 Openclaw Workspace</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Hugging Face Integration Demo
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* HF Integration */}
        <div style={{
          padding: '2rem',
          border: '2px solid #0070f3',
          borderRadius: '0.5rem',
          backgroundColor: '#f0f8ff'
        }}>
          <h2>🤗 Hugging Face Integration</h2>
          <p>Test Hugging Face models with our interactive interface:</p>
          <ul style={{ marginBottom: '1rem' }}>
            <li>Text Generation</li>
            <li>Text Classification</li>
            <li>More models coming...</li>
          </ul>
          <Link href="/test" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold'
          }}>
            Open Test Dashboard
          </Link>
        </div>

        {/* API Documentation */}
        <div style={{
          padding: '2rem',
          border: '2px solid #388e3c',
          borderRadius: '0.5rem',
          backgroundColor: '#f1f8e9'
        }}>
          <h2>📚 API Documentation</h2>
          <p>Available endpoints:</p>
          <ul style={{ marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
            <li>POST /api/hf-generate</li>
            <li>POST /api/hf-classify</li>
            <li>POST /api/hf-embed</li>
            <li>... and more</li>
          </ul>
          <a href="/api/HF_API_EXAMPLES.ts" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#388e3c',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontWeight: 'bold'
          }}>
            View Examples
          </a>
        </div>
      </div>

      {/* Quick Start */}
      <div style={{
        padding: '2rem',
        backgroundColor: '#fff3e0',
        border: '1px solid #f57c00',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h2>⚡ Quick Start</h2>
        <ol style={{ marginBottom: '1rem' }}>
          <li>Visit <strong>/test</strong> to try models interactively</li>
          <li>Check <strong>data/workspace/lib/huggingface.ts</strong> for utility functions</li>
          <li>Check <strong>data/workspace/app/api/HF_API_EXAMPLES.ts</strong> for implementation examples</li>
          <li>Copy examples to create new routes in <strong>data/workspace/app/api/</strong></li>
        </ol>
      </div>

      {/* Environment Status */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#e8f5e9',
        border: '1px solid #4caf50',
        borderRadius: '0.5rem'
      }}>
        <h3>✓ Environment Status</h3>
        <ul>
          <li>✅ Next.js running</li>
          <li>✅ Hugging Face integration loaded</li>
          <li>✅ API routes available</li>
          <li>✅ Test dashboard ready</li>
        </ul>
      </div>
    </div>
  );
}
