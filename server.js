const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
// Add other keys as needed in .env

app.post('/api/chat', async (req, res) => {
  const { provider, character, message } = req.body;
  try {
    if (!provider) return res.status(400).json({ error: 'provider is required' });

    if (provider === 'openai') {
      if (!OPENAI_KEY) return res.status(500).json({ error: 'OpenAI API key not configured on server' });

      const payload = {
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: `You are ${character}, a helpful assistant.` },
          { role: 'user', content: message }
        ],
        max_tokens: 500
      };

      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!r.ok) {
        const text = await r.text();
        return res.status(502).json({ error: 'OpenAI error', detail: text });
      }

      const data = await r.json();
      const reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : JSON.stringify(data);
      return res.json({ reply });
    }

    if (provider === 'anthropic') {
      if (!ANTHROPIC_KEY) return res.status(500).json({ error: 'Anthropic API key not configured on server' });

      // Simple prompt approach for Claude
      const prompt = `You are ${character}. Reply briefly and helpfully.\nUser: ${message}\nAssistant:`;

      const r = await fetch('https://api.anthropic.com/v1/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_KEY
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || 'claude-2',
          prompt,
          max_tokens_to_sample: 300,
          temperature: 0.7
        })
      });

      if (!r.ok) {
        const text = await r.text();
        return res.status(502).json({ error: 'Anthropic error', detail: text });
      }

      const data = await r.json();
      const reply = data.completion || JSON.stringify(data);
      return res.json({ reply });
    }

    if (provider === 'openrouter') {
      if (!OPENROUTER_KEY) return res.status(500).json({ error: 'OpenRouter API key not configured on server' });
      // Example for OpenRouter - user should configure endpoint/model
      const payload = {
        model: process.env.OPENROUTER_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `You are ${character}` },
          { role: 'user', content: message }
        ]
      };

      const r = await fetch('https://api.openrouter.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!r.ok) {
        const text = await r.text();
        return res.status(502).json({ error: 'OpenRouter error', detail: text });
      }

      const data = await r.json();
      const reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : JSON.stringify(data);
      return res.json({ reply });
    }

    // Fallback - mock reply for unsupported providers (or add more integrations)
    return res.json({ reply: `${character} trả lời (mock): Tôi đã nhận được: "${message}"` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error', detail: err.message });
  }
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Chat proxy server running on http://localhost:${port}`);
});
