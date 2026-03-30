# Hugging Face Integration Guide for Openclaw

## 📋 Overview

This guide covers integrating Hugging Face into your Openclaw project to maximize:
- **Model Access**: 100K+ pre-trained models
- **Inference APIs**: No-code inference endpoints
- **Datasets**: Collaborative datasets
- **Spaces**: Gradio/Streamlit apps for demos
- **Fine-tuning**: Custom model training

---

## 🚀 Quick Start (3 Steps)

### 1. Get Your API Token
```bash
# Create account at https://huggingface.co
# Visit: https://huggingface.co/settings/tokens
# Create a token with "repo" and "read" permissions
```

### 2. Add to Environment
```bash
# In .env file
HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxxx
NEXT_PUBLIC_HF_SPACE_ID=your-username/your-space  # Optional
```

### 3. Install Package
```bash
npm install @huggingface/inference @huggingface/hub node-cache
```

---

## 📦 Installation & Setup

### Node.js/Next.js Integration
```bash
npm install @huggingface/inference @huggingface/hub node-cache
```

### Docker Setup Integration
Add to `docker-compose.yml` environment:
```yaml
environment:
  HUGGINGFACE_API_TOKEN: ${HUGGINGFACE_API_TOKEN}
  HF_HOME: /home/node/.cache/huggingface
```

### Environment Variables Template
```env
# API Access
HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxxx

# Model Configuration
HF_TEXT_MODEL=mistralai/Mistral-7B-Instruct-v0.2
HF_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
HF_VISION_MODEL=google/vit-base-patch16-224

# Caching (for Docker)
HF_HOME=/home/node/.cache/huggingface
HF_DATASETS_CACHE=/home/node/.cache/huggingface/datasets

# For Spaces
NEXT_PUBLIC_HF_SPACE_ID=username/space-name
```

---

## 🎯 Use Cases for Openclaw

### 1. **Text Generation (LLMs)**
**Best for**: Chatbots, content generation, coding assistance

```typescript
// data/workspace/app/api/hf-generate/route.ts
import { generateText } from "@/lib/huggingface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  
  const result = await generateText(prompt, {
    maxTokens: 512,
    temperature: 0.7,
  });
  
  return NextResponse.json({ generated_text: result });
}
```

**Popular Models**:
- `mistralai/Mistral-7B-Instruct-v0.2` - Fast, good quality
- `meta-llama/Llama-2-7b-chat-hf` - Meta's LLaMA
- `tiiuae/falcon-7b-instruct` - Trained on 1.5T tokens

### 2. **Image Generation**
**Best for**: Avatar generation, illustrations, mockups

```typescript
// data/workspace/app/api/hf-image/route.ts
import { generateImage } from "@/lib/huggingface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  
  const imageBlob = await generateImage(prompt, {
    guidanceScale: 7.5,
  });
  
  const buffer = await imageBlob.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  
  return NextResponse.json({ 
    image: `data:image/jpeg;base64,${base64}` 
  });
}
```

**Popular Models**:
- `stabilityai/stable-diffusion-3-medium` - Fast, diverse
- `black-forest-labs/FLUX.1-dev` - High quality (requires PRO)
- `runwayml/stable-diffusion-v1-5` - Free, proven

### 3. **Image Classification**
**Best for**: Content moderation, object detection, categorization

```typescript
import { classifyImage } from "@/lib/huggingface";

const result = await classifyImage("image.jpg");

console.log(result); // [{label: "cat", score: 0.95}, ...]
```

### 4. **Sentiment Analysis & NLP**
**Best for**: User feedback, content understanding, support tickets

```typescript
import { classifyText } from "@/lib/huggingface";

const result = await classifyText("This product is amazing! Love it.");

console.log(result); // [{label: "POSITIVE", score: 0.98}]
```

### 5. **Embeddings (Vector Search)**
**Best for**: Semantic search, similarity matching, RAG systems

```typescript
import { getEmbedding } from "@/lib/huggingface";

const embedding = await getEmbedding("Hello world");

// Use with vector DB (Pinecone, Weaviate, Milvus, etc.)
```

### 6. **Document Processing (OCR)**
**Best for**: Resume parsing, invoice extraction, document understanding

```typescript
import { answerFromDocument } from "@/lib/huggingface";

const result = await answerFromDocument(imageData, "What is the total amount?");
```

### 7. **Real-time Chat with Spaces**
**Best for**: Embedded AI widgets, demos, user interaction

```typescript
// Embed a Hugging Face Space in your Next.js app
<iframe
  src="https://your-username-space-name.hf.space"
  frameBorder="0"
  width="100%"
  height="600"
/>
```

---

## 🔧 Advanced Integration Patterns

### Pattern 1: Caching Layer
```typescript
// data/workspace/lib/hf-cache.ts
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTtl: 3600 });

export async function cachedHFRequest(key: string, fn: () => Promise<any>) {
  const cached = cache.get(key);
  if (cached) return cached;
  
  const result = await fn();
  cache.set(key, result);
  return result;
}
```

### Pattern 2: Rate Limiting with Vercel
```typescript
// data/workspace/middleware.ts (Already exists!)
// Add HF rate limiting
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
});

export async function middleware(request: Request) {
  if (request.nextUrl.pathname.startsWith("/api/hf-")) {
    const { success } = await ratelimit.limit(request.ip!);
    if (!success) {
      return new Response("Rate limited", { status: 429 });
    }
  }
}
```

### Pattern 3: Model Inference with Fallback
```typescript
async function inferWithFallback(prompt: string) {
  const models = [
    "mistralai/Mistral-7B-Instruct-v0.2",
    "meta-llama/Llama-2-7b-chat-hf",
    "tiiuae/falcon-7b-instruct",
  ];
  
  for (const model of models) {
    try {
      return await client.textGeneration({
        model,
        inputs: prompt,
      });
    } catch (e) {
      console.log(`${model} failed, trying next...`);
    }
  }
  throw new Error("All models failed");
}
```

---

## 📊 Best Models by Category

| Category | Model | Speed | Quality | Type |
|----------|-------|-------|---------|------|
| **Chat/Text Gen** | Mistral-7B-Instruct | ⚡ Fast | ⭐⭐⭐⭐ | Open |
| **Image Gen** | Stable Diffusion 3 | Medium | ⭐⭐⭐⭐⭐ | Paid |
| **Embeddings** | all-MiniLM-L6-v2 | ⚡ Fast | ⭐⭐⭐⭐ | Open |
| **Sentiment** | distilbert-sst-2 | ⚡ Fast | ⭐⭐⭐⭐ | Open |
| **Vision** | CLIP | ⚡ Fast | ⭐⭐⭐⭐ | Open |

---

## 💰 Pricing Strategy

### Free Tier
- Inference API with rate limits (1,000+ requests/month)
- Public model access
- Community Spaces
- 10 GB storage

### Pro ($9/month)
- No rate limits on Inference API
- Private models & datasets
- Priority compute
- Great for production prototypes

### Enterprise
- Dedicated inference endpoints
- Custom model serving
- On-premise deployment
- SLA support

**Budget Recommendation for Your Setup**:
1. **Start**: Free tier + serverless functions on Vercel
2. **Scale**: Pro tier + Inference API caching
3. **Production**: Dedicated endpoint if >100K requests/month

---

## 🐳 Docker Optimization

### Reduce Image Size: Use Model Caching
```dockerfile
# In custom Openclaw Docker build
ENV HF_HOME=/app/.cache

# Pre-download models during build
RUN python -c "from transformers import AutoModel; AutoModel.from_pretrained('model-id')"
```

### Volume Mount for Models
```yaml
# docker-compose.yml addition
openclaw-gateway:
  volumes:
    - hf_cache:/home/node/.cache/huggingface

volumes:
  hf_cache:
```

---

## 🔐 Security Best Practices

1. **Never commit tokens**
   ```bash
   echo "HUGGINGFACE_API_TOKEN=..." >> .env
   echo ".env" >> .gitignore
   ```

2. **Use read-only tokens** for production

3. **Separate fine-tuning from inference**
   - Fine-tuning: Local with write access
   - Inference API: Limited, read-only token

4. **Monitor API usage**
   - Check `huggingface.co/settings/usage`
   - Set up billing alerts on Vercel

---

## 📝 Next Steps

1. **Create API endpoints** using patterns above
2. **Add to your workspace memory** (`data/workspace/memory/`)
3. **Test with free models** first
4. **Monitor costs** on HF dashboard
5. **Consider fine-tuning** for custom use cases

---

## 🔗 Resources

- Docs: https://huggingface.co/docs
- Models: https://huggingface.co/models
- Spaces: https://huggingface.co/spaces
- API Pricing: https://huggingface.co/pricing
- Community: https://discuss.huggingface.co

---

**Last Updated**: 2026-03-31
