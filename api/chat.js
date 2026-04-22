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
        if (!FIREBASE_API_KEY) {
            console.error("FIREBASE_API_KEY is missing from environment variables.");
            return res.status(500).json({ error: "Server configuration error: Firebase API key missing." });
        }

        const verifyRes = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: token }),
            }
        );
        
        if (!verifyRes.ok) {
            const verifyErr = await verifyRes.json().catch(() => ({}));
            console.error("Firebase token verification failed:", verifyErr);
            return res.status(401).json({ error: "Invalid or expired session. Please log in again." });
        }

        // ── Gemini API call ──────────────────────────────
        if (!GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing from environment variables.");
            return res.status(500).json({ error: "Server configuration error: Gemini API key missing." });
        }

        // Use v1 explicitly
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        
        // Based on diagnostics, the user has access to gemini-2.5-flash
        const modelOptions = { model: "gemini-2.5-flash" };
        const requestOptions = { apiVersion: "v1" };

        let model = genAI.getGenerativeModel(modelOptions, requestOptions);

        const prompt = `You are the AI assistant for "Decision Graveyard", a personal decision-tracking app.
Your role is to help the user reflect on their past decisions and lessons, identify patterns, and make better future choices.
Be concise, insightful, and empathetic. Use plain text. Avoid markdown headers. Keep responses under 200 words unless the question requires more detail.

USER'S LOGGED DATA:
${contextText || "(No decisions or lessons logged yet)"}

User's question: ${message}`;

        console.log("Sending prompt to Gemini...");
        let result;
        try {
            result = await model.generateContent(prompt);
        } catch (e) {
            console.error("Primary model failed:", e.message);
            // Fallback to 2.0 flash which was also in the list
            const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }, { apiVersion: "v1" });
            result = await fallbackModel.generateContent(prompt);
        }
        
        if (!result || !result.response) {
            throw new Error("Empty response from Gemini API.");
        }

        const responseText = result.response.text();
        console.log("Successfully received response from Gemini.");

        return res.status(200).json({ reply: responseText });

    } catch (error) {
        console.error("AI Handler Exception:", error);
        
        let clientMessage = `AI Error: ${error.message}`;

        if (error.message && error.message.includes("quota")) {
            clientMessage = "The AI service is currently busy (quota exceeded). Please try again in a few minutes.";
        } else if (error.message && error.message.includes("API key")) {
            clientMessage = "Authentication error with the AI service. Please contact support.";
        } else if (error.message && error.message.includes("safety")) {
            clientMessage = "I'm sorry, I cannot answer that question as it was flagged by my safety filters.";
        }

        return res.status(500).json({ error: clientMessage });
    }
};
