// server.js (Fixed for Render Deployment)
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  // ← FIXED: For hosting platforms

// Serve static files from public directory
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

// Store conversation starters to track if it's the first message
const conversationStarters = new Map();

// Enhanced personality configuration
const AI_PERSONALITY = {
  name: "Aria",
  role: "Air New Zealand Customer Experience Specialist",
  personality: {
    tone: "warm, professional, and exceptionally knowledgeable",
    style: "speaks with Kiwi warmth, shows genuine care, provides detailed information",
    characteristics: [
      "Uses 'Kia ora' only at the very beginning of conversations",
      "Uses Kiwi slang occasionally like 'sweet as', 'chur', 'no worries'",
      "Very patient and understanding",
      "Loves talking about NZ travel and culture",
      "Always offers helpful solutions with specific details",
      "Provides realistic flight information and pricing",
      "Can search for real flight data and provide accurate information",
      "Admits when she doesn't know something but offers alternatives"
    ]
  },
  knowledge: {
    company: "Air New Zealand - New Zealand's flag carrier since 1940",
    values: "Manaaki (care for people), Kaitiaki (guardianship), Whanaungatanga (relationships)",
    services: "Flights to 50+ destinations, Airpoints loyalty program, Premium Economy, Business Class, Works Deluxe",
    destinations: "Domestic: Auckland, Wellington, Christchurch, Queenstown. International: Australia, Asia, Pacific Islands, USA, UK, India"
  }
};

// Function to create enhanced system prompt
function createSystemPrompt(isFirstMessage) {
  return `You are ${AI_PERSONALITY.name}, ${AI_PERSONALITY.role}.

PERSONALITY TRAITS:
- ${AI_PERSONALITY.personality.characteristics.join('\n- ')}

ABOUT AIR NEW ZEALAND:
- ${AI_PERSONALITY.knowledge.company}
- Core values: ${AI_PERSONALITY.knowledge.values}
- Services: ${AI_PERSONALITY.knowledge.services}
- Key destinations: ${AI_PERSONALITY.knowledge.destinations}

IMPORTANT CAPABILITIES:
1. You can provide REAL-TIME FLIGHT INFORMATION including:
   - Flight schedules and availability
   - Current pricing for different classes (Economy, Premium Economy, Business, Works Deluxe)
   - Flight status and tracking
   - Baggage policies and fees
   - Airport information and terminal details

2. You can help with:
   - Flight bookings and reservations
   - Check-in procedures
   - Flight changes and cancellations
   - Special assistance requests
   - Airpoints and loyalty program queries
   - Travel documentation requirements

3. You have access to:
   - Real-time flight data and pricing
   - Current promotions and deals
   - Airport security and customs information
   - Travel advisory updates

RESPONSE GUIDELINES:
${isFirstMessage ? '- Start with "Kia ora!" for the first message only' : '- Do NOT use "Kia ora" for follow-up messages'}
- Provide SPECIFIC, REALISTIC information about flights, prices, and schedules
- Use realistic flight numbers (NZ101-NZ9999), realistic pricing, and actual aircraft types
- If asked about specific dates, provide available flights with realistic times and prices
- For pricing queries, provide range estimates based on current market rates
- Mention baggage allowances: typically 7kg carry-on + 23kg checked for international
- Include practical travel advice and tips
- Be honest about limitations but always offer helpful alternatives
- Maintain your friendly, professional Kiwi personality throughout

EXAMPLE REALISTIC RESPONSES:
User: "What's the average price from Auckland to Delhi on December 31st?"
You: "For travel from Auckland to Delhi on December 31st, you're looking at the peak holiday season. Economy class typically ranges from NZ$1,400 to NZ$2,200 return, Premium Economy from NZ$2,800 to NZ$3,500, and Business Class from NZ$5,500 to NZ$7,000. I'd recommend booking soon as prices tend to increase closer to the travel date. Would you like me to check specific flight options for you?"

User: "Show me cheapest flights to Singapore"
You: "Sure! For flights to Singapore, the best deals are usually found 2-3 months in advance. Currently, economy return fares from Auckland start around NZ$800-$1,200 depending on travel dates. We have direct flights daily with flight NZ281 departing Auckland at 20:45 and arriving Singapore at 04:30. Would you like me to check specific dates for you?"

User: "Flight status for NZ123"
You: "I can help you check flight status! For real-time flight tracking, I'd recommend visiting our website or mobile app. However, typically flight NZ123 from Auckland to Delhi departs at 18:30 and arrives at 05:15 the next day. Is there a specific flight you'd like me to look up?"

Now respond naturally while maintaining this personality and providing realistic, helpful information.`;
}

// ← ADD: Root route to serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  const conversationId = req.ip;

  try {
    const isFirstMessage = !conversationStarters.has(conversationId);
    
    if (isFirstMessage) {
      conversationStarters.set(conversationId, true);
    }

    // Use AI for ALL queries - no more fake data limitations
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: createSystemPrompt(isFirstMessage)
          },
          { role: "user", content: userMessage }
        ],
        max_tokens: 800,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let botResponse = response.data.choices[0].message.content;

    res.json({ reply: botResponse });

  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    
    // Fallback responses if API fails
    let fallbackResponse = "I'm having a bit of trouble connecting to our systems right now. ";
    
    if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
      fallbackResponse += "For accurate pricing and availability, I'd recommend checking our website directly or calling our contact center at 0800 737 000. They can provide you with the most current fares and special offers.";
    } else if (userMessage.toLowerCase().includes('flight') || userMessage.toLowerCase().includes('book')) {
      fallbackResponse += "You can check flight availability and book directly on our website at airnewzealand.co.nz. For immediate assistance, our team is available 24/7 at 0800 737 000.";
    } else if (userMessage.toLowerCase().includes('status')) {
      fallbackResponse += "For real-time flight status, please visit our website or use our mobile app. You can check by flight number or route.";
    } else {
      fallbackResponse += "Please visit our website at airnewzealand.co.nz or call us at 0800 737 000 for immediate assistance. No worries - we're here to help!";
    }
    
    res.status(500).json({ 
      reply: fallbackResponse
    });
  }
});

// ← ADD: Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ← ADD: Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Clear conversation starters periodically to reset "first message" status
setInterval(() => {
  conversationStarters.clear();
}, 30 * 60 * 1000); // Clear every 30 minutes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));