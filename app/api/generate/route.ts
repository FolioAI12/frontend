import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateWithRetry(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>['getGenerativeModel']>,
  prompt: string,
  retries = 3
): Promise<string> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8 },
      });
      return result.response.text();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const is429 = msg.includes('429') || msg.includes('quota') || msg.includes('Too Many Requests');

      if (is429 && attempt < retries) {
        // Parse retry delay from error (e.g. "retry in 19s")
        const match = msg.match(/retry[^\d]*(\d+)/i);
        const waitSec = match ? parseInt(match[1]) + 3 : (attempt + 1) * 20;
        console.log(`429 — waiting ${waitSec}s before retry ${attempt + 1}/${retries}`);
        await sleep(waitSec * 1000);
        continue;
      }
      throw err;
    }
  }
  throw new Error('Max retries exceeded');
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, profilePhoto } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    let html = await generateWithRetry(model, prompt);

    // Strip markdown fences
    html = html.replace(/^```html\s*/i, '').replace(/\s*```$/i, '').trim();

    // Inject profile photo AFTER generation — never in the prompt
    if (profilePhoto && html.includes('__PROFILE_PHOTO_PLACEHOLDER__')) {
      html = html.replace(/["']__PROFILE_PHOTO_PLACEHOLDER__["']/g, `"${profilePhoto}"`);
    }

    if (!html.includes('<!DOCTYPE html>') && !html.includes('<html')) {
      return NextResponse.json(
        { error: 'Invalid HTML generated. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ html });
  } catch (error: unknown) {
    console.error('Gemini error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';

    if (msg.includes('429') || msg.includes('quota')) {
      return NextResponse.json(
        {
          error:
            'Gemini free-tier rate limit hit. Please wait ~1 minute and try again, or upgrade your plan at https://ai.dev/rate-limit',
        },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
