import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { bio, jobTitle, skills, experience } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    const prompt = `You are a professional resume and portfolio writer. Rewrite the following bio to be compelling, professional, and engaging. Keep it to 2-3 sentences (60-80 words). Use first person, active voice.

Job Title: ${jobTitle}
Current Bio: ${bio || '(empty)'}
Key Skills: ${skills?.join(', ') || 'none provided'}
Years of experience: ${experience?.length || 0} roles

Return ONLY the improved bio text, nothing else. No quotes, no labels, just the bio.`;

    const result = await model.generateContent(prompt);
    const improved = result.response.text().trim();

    return NextResponse.json({ bio: improved });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
