const { GoogleGenerativeAI } = require("@google/generative-ai");

// ── Config ──────────────────────────────────────────────
const GEMINI_API_KEY  = process.env.GEMINI_API_KEY;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY; // Web API key from Firebase console

// ── Handler ─────────────────────────────────────────────
module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    // ── Auth token check ─────────────────────────────────
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }
    const token = authHeader.split("Bearer ")[1];

    // ── Body validation ──────────────────────────────────
    const { message, contextText } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required." });

    try {
        // ── Verify Firebase ID token via REST API ────────
        // This works on any platform — no service account needed.
        if (FIREBASE_API_KEY) {
            const verifyRes = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken: token }),
                }
            );
            if (!verifyRes.ok) {
                return res.status(401).json({ error: "Invalid or expired session. Please log in again." });
            }
        }

        // ── Gemini API call ──────────────────────────────
        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: "Gemini API key is not configured on the server." });
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are the AI assistant for "Decision Graveyard", a personal decision-tracking app.
Your role is to help the user reflect on their past decisions and lessons, identify patterns, and make better future choices.
Be concise, insightful, and empathetic. Use plain text. Avoid markdown headers. Keep responses under 200 words unless the question requires more detail.

USER'S LOGGED DATA:
${contextText || "(No decisions or lessons logged yet)"}

User's question: ${message}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return res.status(200).json({ reply: responseText });

    } catch (error) {
        console.error("AI Handler Error:", error.message || error);
        return res.status(500).json({ error: "Failed to get AI response. Please try again shortly." });
    }
};
