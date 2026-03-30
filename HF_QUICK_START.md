# Quick Implementation Checklist

## ✅ Pre-Setup (5 minutes)

- [ ] Visit https://huggingface.co and create account
- [ ] Go to https://huggingface.co/settings/tokens
- [ ] Create token with "repo" + "write" permissions
- [ ] Copy token (you'll need it soon)

---

## ✅ Step 1: Environment Setup (5 minutes)

In your project root:

```bash
# Copy example to your .env
cat .env.example.hf >> .env

# Or manually add to .env:
HUGGINGFACE_API_TOKEN=hf_xxxxxxxxxxxxx
HF_TEXT_MODEL=mistralai/Mistral-7B-Instruct-v0.2
HF_IMAGE_MODEL=stabilityai/stable-diffusion-3-medium
```

---

## ✅ Step 2: Install Dependencies (2 minutes)

```bash
cd data/workspace

npm install @huggingface/hub

# Optional: transformers for local models
npm install --optional transformers
```

---

## ✅ Step 3: Copy Library Files (1 minute)

The following files are already created for you:

- ✅ `data/workspace/lib/huggingface.ts` - Main utilities (12 functions)
- ✅ `data/workspace/components/HFComponents.tsx` - UI components (5 components)
- ✅ `data/workspace/app/api/HF_API_EXAMPLES.ts` - 12 complete API route examples

**You need to:**
1. Copy API examples to actual route files:

```bash
# Create API route directories
mkdir -p data/workspace/app/api/hf-generate
mkdir -p data/workspace/app/api/hf-classify
mkdir -p data/workspace/app/api/hf-embed
mkdir -p data/workspace/app/api/hf-image
mkdir -p data/workspace/app/api/hf-summarize
mkdir -p data/workspace/app/api/hf-qa
mkdir -p data/workspace/app/api/hf-entities
mkdir -p data/workspace/app/api/hf-classify-image
mkdir -p data/workspace/app/api/hf-detect
mkdir -p data/workspace/app/api/hf-transcribe
mkdir -p data/workspace/app/api/hf-tts
mkdir -p data/workspace/app/api/hf-document-qa

# Copy the example route implementations from HF_API_EXAMPLES.ts
# into the appropriate route.ts files
```

---

## ✅ Step 4: Docker Configuration (5 minutes)

Update your `docker-compose.yml` `openclaw-gateway` service:

```yaml
services:
  openclaw-gateway:
    environment:
      # Add these:
      HUGGINGFACE_API_TOKEN: ${HUGGINGFACE_API_TOKEN}
      HF_HOME: /home/node/.cache/huggingface
      HF_DATASETS_CACHE: /home/node/.cache/huggingface/datasets
      
    volumes:
      # Add this:
      - hf_cache:/home/node/.cache/huggingface

# Add at the end:
volumes:
  hf_cache:
```

---

## ✅ Step 5: Test Your Setup (5 minutes)

```bash
# Start dev server
cd data/workspace
npm run dev

# In another terminal, test:
curl -X POST http://localhost:3000/api/hf-generate \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "Hello, world!"}'
```

Expected response:
```json
{
  "generated_text": "Hello, world! How can I help you today?"
}
```

---

## 📊 Use Case Reference

### Text Generation
```typescript
// data/workspace/app/api/hf-generate/route.ts
import { generateText } from "@/lib/huggingface";

const result = await generateText("Your prompt");
```

### Sentiment Analysis
```typescript
// data/workspace/app/api/hf-classify/route.ts
import { classifyText } from "@/lib/huggingface";

const result = await classifyText("I love this!");
// Returns: [{label: "POSITIVE", score: 0.98}]
```

### Image Generation
```typescript
// data/workspace/app/api/hf-image/route.ts
import { generateImage } from "@/lib/huggingface";

const blob = await generateImage("A beautiful sunset");
```

### Embeddings (Vector Search)
```typescript
// data/workspace/app/api/hf-embed/route.ts
import { getEmbedding } from "@/lib/huggingface";

const vector = await getEmbedding("Hello world");
// Use with Pinecone, Weaviate, etc.
```

### Text Summarization
```typescript
// data/workspace/app/api/hf-summarize/route.ts
import { summarizeText } from "@/lib/huggingface";

const summary = await summarizeText("Long article...");
```

### Q&A (RAG Pattern)
```typescript
// data/workspace/app/api/hf-qa/route.ts
import { questionAnswering } from "@/lib/huggingface";

const answer = await questionAnswering(
  "Context paragraph...",
  "What is the question?"
);
```

---

## 🎯 Next: Maximize Platform Usage

### 1. **Use Hugging Face Spaces** (FREE Demos)
- Upload your components to Spaces
- Share with team (no hosting cost)
- Get your own shareable URL

### 2. **Fine-tune Models** (Your Data)
```bash
huggingface-cli repo create my-custom-model
# Train with your data
huggingface-cli upload my-custom-model
```

### 3. **Create Inference Endpoint** (Scalable)
- Go to https://huggingface.co/inference-endpoints
- Deploy your model once
- Use in production (handles auto-scaling)

### 4. **Use Datasets Hub**
```typescript
import { listDatasets } from "@huggingface/hub";

const datasets = await listDatasets();
// Access public datasets for training/testing
```

### 5. **Model Cards & Documentation**
- Add README.md to your models
- Document performance metrics
- Share with community

---

## 💰 Cost Optimization

| Action | Cost | Alternative |
|--------|------|-------------|
| Inference API | Free (with limits) | Pro ($9/mo) for unlimited |
| Hosted Models | Free (community) | Paid (priority) |
| Spaces | Free (public) | Pro for private |
| Fine-tuning | Your compute | HF AutoTrain (paid) |

**Recommendation**: Start free, scale with Pro when needed (~$10/month).

---

## 🚨 Common Issues

### Issue: "401 Unauthorized"
```bash
# Fix: Check token is correct
cat .env | grep HUGGINGFACE_API_TOKEN

# Regenerate at: https://huggingface.co/settings/tokens
```

### Issue: "Model loading... please wait"
```bash
# This means the model is cold-starting (3-30 seconds)
# Pre-warm in docker build or use paid endpoints
```

### Issue: "Rate limited"
```bash
# You hit free tier limits
# Solution: Upgrade to Pro or implement caching
npm install node-cache
```

### Issue: OOM (Out of Memory) with large models
```bash
# Use smaller models:
HF_TEXT_MODEL=distilbert-base-uncased  # Instead of Llama
HF_IMAGE_MODEL=CompVis/stable-diffusion-v1-4  # Smaller version
```

---

## 📚 What to Read Next

1. **HUGGINGFACE_SETUP.md** - Detailed guide
2. **data/workspace/lib/huggingface.ts** - Source code
3. **https://huggingface.co/docs** - Official docs
4. **https://huggingface.co/models** - Browse 100K+ models

---

## 🎓 Learning Path (Optional)

**Week 1**: Text generation + sentiment analysis  
**Week 2**: Add image generation + embeddings  
**Week 3**: Fine-tune a model on your data  
**Week 4**: Deploy to production with Spaces  

---

## 📞 Support

- **Docs**: https://huggingface.co/docs
- **Discord**: https://discord.gg/JfAtqEZZVH
- **Forum**: https://discuss.huggingface.co
- **Issues**: https://github.com/huggingface/hub/issues

---

**Setup Time**: ~20 minutes  
**Next Test**: Run the curl command above  
**Estimated Result**: Working API within 30 minutes
