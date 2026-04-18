# Project Rules for AI Agent

## Project Overview
This is a website called "Decision Graveyard". A platform to log, reflect on, and learn from past personal and career decisions with integrated agentic AI
The frontend is already fully built with plain HTML, CSS, and JavaScript across 19 files.
We are now adding a Firebase backend to make it fully functional.

## Tech Stack
- Frontend: Vanilla HTML, CSS, JavaScript (no frameworks)
- Backend/Database: Firebase (Firestore for database, Firebase Auth for login)
- Hosting: Firebase Hosting

## Project File Structure
- All frontend files are in the root folder
- Key Files:
    - home page.html: Homepage
    - Login page.html: Login Page
    - sign up page.html: Signup Page
    - Decision_form.html: Form Page (To enter new decisions)
    - Timeline page.html: Timeline Page (To view all decisions in a timeline)
    - insights.html: Insights Page (Contains statistics about decisions)
    - lessons.html: Lessons Page (Contains (user written)lessons learned from decisions)
    - forgot password.html and reset password.html: Forgot and Reset password pages

## What Needs to Be Built
- Firebase Authentication (email/password login and signup)
- Firestore database to store and retrieve [describe your data, e.g. "user profiles, orders, products"]
- Connect all existing HTML forms and buttons to Firebase functions\
- Add AI chatbot in lessons.html page for users to query about their decisions and lessons learned and help them make new and better decisions. For this task , use gemini 2.5, and create a simple UI for the chatbot using HTML, CSS and JavaScript.
- Set up Firebase Hosting for deployment

## Rules the Agent Must Follow
- Do NOT change the visual design or layout of any existing HTML/CSS
- Do NOT switch to a JS framework (React, Vue, etc.) — keep everything in vanilla JS
- Always ask before creating new files
- Never hardcode API keys — use Firebase config object only
- Keep changes minimal and focused