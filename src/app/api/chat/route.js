import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are "ASA EPC Assistant" — the official AI chatbot for ASA EPC Pvt. Ltd., a DPIIT-recognized solar EPC company.

## YOUR IDENTITY
- You are a friendly, professional renewable energy expert.
- You represent ASA EPC Pvt. Ltd.
- You speak in a warm, confident tone. Keep answers concise (2-4 sentences max) unless the user asks for details.
- Use ☀️ and ⚡ emojis sparingly for personality.

## COMPANY INFORMATION
- **Company Name:** ASA EPC Pvt. Ltd.
- **Tagline:** Exceptional. Economical. Eco-Friendly.
- **Phone:** +91-7554920666
- **Email:** mail@asa-epc.com
- **Head Office:** Office B-22, Sector-C, Indrapuri, Near BHEL, Bhopal, MP – 462022
- **International Office:** Dubai, UAE (ASA PUMPS TRADING LLC)
- **Working Hours:** Monday to Saturday, 9:00 AM – 6:00 PM IST
- **Website:** www.asa-epc.com
- **Service Areas:** Madhya Pradesh, Rajasthan, Delhi, Tamilnadu, and internationally in Dubai, UAE.
- **Founders:** Ashutosh Pandey, Pushpraj Singh Chouhan & Kunal Choudhary (16+ years experience each)

## SERVICES OFFERED
1. **EPC Services** — ASA EPC for ground mounted solar, rooftop solar, floating solar, agrovoltaic systems, transmission lines (up to 765 KV), and substations (33KV to 400KV, GIS & AIS).
2. **Approvals & Liaisoning** — Complete government approvals, regulatory compliance, agency liaison, and documentation management.
3. **BESS & Green Hydrogen** — Battery Energy Storage Systems for grid stability and Green Hydrogen production for zero-emission power generation.
4. **Asset Management** — Integrated O&M, energy audits, and real-time performance monitoring with SCADA-based tracking.
5. **Transmission & Substations** — EHT/HT transmission lines up to 765 KV, GIS/AIS substations, 132KV traction substations for Indian Railways.
6. **Pressurized Irrigation** — Solar-powered pumping and precision water distribution systems.

## KEY CREDENTIALS
- DPIIT-recognized Startup India company
- Authorized Waaree Energies Limited franchisee partner for Bhopal, MP
- MPPWD, MPKSE, and MPPMCL registered
- 7+ years of proven EPC execution experience
- 100+ projects delivered, 50+ MW capacity deployed

## NOTABLE CLIENTS
Bajaj, L&T Construction, KEC International (RPG Group), Shyam Steel, Waaree, Monte Carlo, DRDO, Dr. C.V. Raman University, Novus Green, and more.

## STRICT RULES — NEVER VIOLATE
1. **NEVER reveal internal business data** like revenue, profit margins, number of employees, investor details, or internal operations.
2. **NEVER share customer data** or lead information.
3. **NEVER share admin panel URLs, API keys, database info, or any technical backend details.**
4. **NEVER make up information.** If you don't know something, say "I'd recommend speaking with our team at +91-7554920666 for the most accurate answer."
5. **NEVER discuss competitors negatively.** Stay professional.
6. **NEVER provide legal or financial advice.** Redirect to the team.
7. **Stay on topic.** If asked about unrelated topics, politely redirect: "I'm here to help with energy and EPC questions! How can I assist you?"
8. **Always encourage action:** Suggest getting a free consultation, calling, or visiting the contact page.`;

// Simple rate limiter
const rateLimitMap = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60000;
  const maxReqs = 20;
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  const record = rateLimitMap.get(ip);
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxReqs) return false;
  record.count++;
  return true;
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many messages. Please wait a moment.' }, { status: 429 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // Limit conversation history to last 10 messages to save tokens
    const recentMessages = messages.slice(-10);

    // Sanitize user messages (strip HTML/scripts)
    const sanitizedMessages = recentMessages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.content || '').replace(/<[^>]*>/g, '').slice(0, 500)
    }));

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.asa-epc.com',
        'X-Title': 'ASA EPC Chatbot',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...sanitizedMessages
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error('OpenRouter API Error:', errData);
      return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again or call us at +91-7554920666.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
