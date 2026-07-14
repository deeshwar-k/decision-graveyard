# Decision Graveyard 🪦💡

> A personal and career decision-logging platform designed to help users reflect on past choices, uncover behavioral patterns, and make better decisions moving forward.

## 📖 Project Overview
**Decision Graveyard** is a comprehensive web application developed as a college project. It serves as a personal journal and analytical tool for decisions. Often, we make choices and forget the context, emotions, or rationale behind them. This platform allows users to "bury" their past decisions (good or bad) and extract valuable insights from them over time. 

A standout feature of this project is the integration of an **Agentic AI Chatbot** powered by Google's Gemini API, which acts as a personalized decision coach by analyzing the user's past logged decisions and providing tailored advice for future choices.

## ✨ Key Features
- **Secure Authentication**: User sign-up, login, and secure password reset flows powered by Firebase Authentication.
- **Decision Logging (The Graveyard)**: A dedicated form to log the context, pros/cons, and ultimate outcome of personal or career decisions.
- **Interactive Timeline**: A chronological visual representation of all past choices.
- **Insights & Analytics Dashboard**: Statistical breakdowns of decision outcomes (e.g., success rates, most common categories).
- **Lessons Learned**: A reflective space where users document what they learned from specific outcomes.
- **Agentic AI Coach**: An integrated chatbot that reads the user's "graveyard" context and offers personalized, data-driven advice on new dilemmas.

## 🛠️ Technology Stack
This project was intentionally built using a lightweight, fundamental web stack without heavy frontend frameworks to demonstrate strong foundational web design principles.

*   **Frontend**: Vanilla HTML5, CSS3, Vanilla JavaScript (ES6+)
*   **Backend & Database**: Firebase Firestore (NoSQL Database)
*   **Authentication**: Firebase Auth (Email/Password)
*   **AI Integration**: Google Gemini API (via Vercel Serverless Functions)
*   **Deployment & Hosting**: Vercel

## 📂 Project Structure
```text
📦 Project - Decision Graveyard
 ┣ 📂 api/                   # Vercel Serverless Functions (Node.js)
 ┃ ┗ 📜 chat.js              # Secure backend handler for Gemini AI API
 ┣ 📜 index.html             # Landing page / Redirect
 ┣ 📜 home page.html         # Main dashboard
 ┣ 📜 Login page.html        # Authentication login
 ┣ 📜 Decision_form.html     # Input form for new decisions
 ┣ 📜 Timeline page.html     # Chronological view of decisions
 ┣ 📜 insights.html          # Statistical dashboard
 ┣ 📜 lessons.html           # Lessons learned & AI Chatbot UI
 ┣ 📜 forgot password.html   # Password reset flow
 ┣ 📜 firebase-config.js     # Firebase initialization & configuration
 ┗ 📜 *.css                  # Dedicated CSS theme files for each page
```

## 🚀 Setup & Installation
To run this project locally for development or testing:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/decision-graveyard.git
   cd decision-graveyard
   ```

2. **Configure Firebase:**
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable **Firestore** and **Email/Password Authentication**.
   - Update `firebase-config.js` with your specific Firebase project credentials.

3. **Configure the AI Backend (Vercel):**
   - The AI chatbot relies on a Vercel Serverless function (`api/chat.js`) to keep API keys secure.
   - Install Vercel CLI: `npm i -g vercel`
   - Link the project and add your environment variables (`GEMINI_API_KEY` and `FIREBASE_API_KEY`).

4. **Run Locally:**
   - You can use any local server (like VS Code Live Server or Python's HTTP server) to serve the HTML files.
   - Example using Python:
     ```bash
     python -m http.server 3000
     ```
   - Open `http://localhost:3000` in your browser.

## 🎓 Academic Context
This project demonstrates proficiency in:
- Responsive Web Design (RWD) and modern CSS architectures.
- Asynchronous JavaScript (Promises, async/await, Fetch API).
- Integration of third-party Backend-as-a-Service (BaaS) platforms (Firebase).
- Secure handling of external AI APIs using Serverless backend architecture.

