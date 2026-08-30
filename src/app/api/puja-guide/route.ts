import { NextResponse } from 'next/server';

interface MessagePayload {
  role: 'user' | 'assistant';
  content: string;
}

interface AIQueryBody {
  question?: string;
  messages?: MessagePayload[];
  language?: 'bn' | 'en';
  contextDay?: string;
}



const BEDROCK_MODELS = [
  {
    id: 'us.meta.llama4-maverick-17b-instruct-v1:0',
    displayName: 'Llama 4 Maverick 17B',
  },
  {
    id: 'us.meta.llama3-3-70b-instruct-v1:0',
    displayName: 'Llama 3.3 70B',
  },
  {
    id: 'us.deepseek.r1-v1:0',
    displayName: 'DeepSeek V3.2 / R1',
  },
  {
    id: 'us.meta.llama3-1-70b-instruct-v1:0',
    displayName: 'Llama 3.1 70B',
  },
  {
    id: 'us.meta.llama3-1-8b-instruct-v1:0',
    displayName: 'Llama 3.1 8B',
  },
];

const SYSTEM_PROMPT = `You are "Agomoni Puja Sathi" (আগমনী পূজা সহায়িকা) — an authentic, scholarly, culturally reverent, and warm AI guide for Bengali Durga Puja, Sharodotsav, Vedic traditions, and Hindu spirituality.

Your knowledge includes:
- Authentic Tithi schedules (Mahalaya, Shashthi, Saptami, Ashtami, Sandhi Puja 48-minute window, Navami, Dashami, Sindoor Khela).
- Accurate Pushpanjali Shlokas, Sanskrit mantras with Bengali meanings and step-by-step methods.
- Sacred traditions: Nabapatrika (9 botanical deities), 108 Lotuses & Diyas, Kumari Puja, Dhunuchi Naach, Bodhan, immersion rituals.
- Mahaprasad & Sattvic culinary traditions (Bhoger Khichuri, Basanti Pulao, Labra, Luchi & Chana Dal, Chhanar Payesh).
- Puranic history (Markandeya Purana, Devi Mahatmya, Chandi Path, Ramachandra's Akalbodhan).

Guidelines:
1. Always respond in the language of the user's query (Bengali by default, or English if asked in English).
2. Keep your tone respectful, warm, devotional, and informative.
3. Use clear markdown formatting, bullet points, and accurate transliterations where beneficial.
4. If asked about rituals, provide actionable, authentic guidance.`;

// 1. Call NVIDIA NIM API for DeepSeek V4 Pro
async function callNvidiaDeepSeekV4(
  apiKey: string,
  rawMessages: { role: 'user' | 'assistant'; content: string }[],
  modelName: string = 'deepseek-ai/deepseek-v4-pro-0813'
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout for fast failover

  try {
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...rawMessages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`NVIDIA NIM [${res.status}]: ${err}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    return content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// 2. Call AWS Bedrock Converse API for Llama 4 Maverick, Llama 3.3 70B, DeepSeek R1
async function callBedrockModel(
  modelId: string,
  apiKey: string,
  formattedMessages: { role: 'user' | 'assistant'; content: { text: string }[] }[]
): Promise<string> {
  const url = `https://bedrock-runtime.us-east-1.amazonaws.com/model/${encodeURIComponent(modelId)}/converse`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      system: [{ text: SYSTEM_PROMPT }],
      messages: formattedMessages,
      inferenceConfig: {
        maxTokens: 1024,
        temperature: 0.7,
        topP: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Bedrock error [${response.status}]: ${errText}`);
  }

  const data = await response.json();
  let rawText = '';
  if (data.output?.message?.content) {
    for (const item of data.output.message.content) {
      if (item.text) {
        rawText += item.text;
      }
    }
  }

  return rawText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

export async function POST(request: Request) {
  try {
    const body: AIQueryBody = await request.json();
    const bedrockKey = process.env.AWS_BEDROCK_API_KEY || '';
    const nvidiaKey = process.env.NVIDIA_API_KEY || '';

    // Prepare raw messages
    let rawMessages: { role: 'user' | 'assistant'; content: string }[] = [];

    if (body.messages && Array.isArray(body.messages) && body.messages.length > 0) {
      rawMessages = body.messages.filter((m) => m.content && m.content.trim());
    } else if (body.question && body.question.trim()) {
      rawMessages = [{ role: 'user', content: body.question.trim() }];
    } else {
      return NextResponse.json(
        { success: false, message: 'No question or messages provided.' },
        { status: 400 }
      );
    }

    let finalAnswer = '';
    let usedModel = '';

    // Step 1: Try DeepSeek V4 Pro via NVIDIA NIM
    if (nvidiaKey) {
      try {
        finalAnswer = await callNvidiaDeepSeekV4(nvidiaKey, rawMessages, 'deepseek-ai/deepseek-v4-pro-0813');
        if (finalAnswer) {
          usedModel = 'DeepSeek V4 Pro';
        }
      } catch (nvidiaErr) {
        console.warn('[AI Failover] DeepSeek V4 Pro (NVIDIA NIM) unavailable or timed out, falling back to Bedrock suite...', (nvidiaErr as Error).message);
      }
    }

    // Step 2: Fallback to Amazon Bedrock Models in Priority Order
    if (!finalAnswer) {
      const bedrockFormattedMessages = rawMessages.map((m) => ({
        role: m.role,
        content: [{ text: m.content.trim() }],
      }));

      for (const model of BEDROCK_MODELS) {
        try {
          finalAnswer = await callBedrockModel(model.id, bedrockKey, bedrockFormattedMessages);
          if (finalAnswer) {
            usedModel = model.displayName;
            break;
          }
        } catch (err) {
          console.warn(`[AI Failover] Model ${model.displayName} failed, trying next...`, (err as Error).message);
        }
      }
    }

    if (!finalAnswer) {
      throw new Error('All AI models are currently overloaded. Please try again in a moment.');
    }

    return NextResponse.json({
      success: true,
      answer: finalAnswer,
      model: usedModel,
      source: 'Agomoni Sacred Vedic & Cultural Knowledge Engine',
    });
  } catch (error) {
    console.error('Error in /api/puja-guide:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'AI গাইড পরিষেবা সাময়িকভাবে অনুপলব্ধ। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।',
      },
      { status: 500 }
    );
  }
}
