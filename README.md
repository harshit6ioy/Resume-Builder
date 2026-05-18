# ResumePro - AI-Powered Resume Builder & Recruitment SaaS

ResumePro is a production-ready, SaaS-grade application designed to help job seekers instantly generate highly optimized, ATS-friendly resumes using Artificial Intelligence, while providing recruiters with a robust dashboard to hunt for top talent.

## 🚀 Features

### For Job Seekers
- **AI Summary Generation**: Automatically write highly professional, non-conversational career summaries based on industry and experience.
- **Smart Skill & Project Suggestions**: Dynamically generate relevant skills and project ideas mapped specifically to your industry.
- **ATS Review Engine**: Instantly score your resume against Applicant Tracking Systems, complete with missing keywords and formatting advice.
- **Dynamic Live Preview**: See your resume adapt in real-time as you switch between premium templates (Creative, Startup, Executive, Minimalist).
- **1-Click PDF Export**: Download your perfect resume as a beautifully formatted PDF.
- **Public Visibility Toggle**: Opt-in to make your resume visible to top recruiters on the platform.

### For Recruiters
- **Talent Search**: Search the global database of public resumes by skill, industry, or keyword.
- **Direct Messaging**: Send instant outreach messages directly to job seekers' dashboards.

### Technical & UI Highlights
- **Premium SaaS Aesthetic**: Built using a highly polished, flat monochromatic design system inspired by Vercel and Linear.
- **Robust Dark Mode**: Fully supported, class-based dark and light themes.
- **Production Error Handling**: Graceful API fallbacks and strictly formatted AI prompt engineering.

---

## 🛠️ Tech Stack

**Frontend (Client)**
- React 18 (Vite)
- Tailwind CSS v4 (Class-based Dark Mode)
- Framer Motion (Subtle UI Animations)
- React Router DOM
- Axios

**Backend (API)**
- Laravel 11
- MongoDB (via `mongodb/laravel-mongodb`)
- Laravel Sanctum (Token-based Authentication)
- Barryvdh DOMPDF (Server-side PDF Rendering)
- OpenRouter API (LLM Integration)

---

## 💻 Local Development Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MongoDB (Local or Atlas URL)
- OpenRouter API Key

### Backend Setup (Laravel)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Set up your `.env` file:
   ```bash
   cp .env.example .env
   ```
   *Make sure to configure your `DB_URI` (MongoDB) and `OPENROUTER_API_KEY`.*
4. Start the backend server:
   ```bash
   php artisan serve
   ```

### Frontend Setup (React)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   ```env
   VITE_API_URL=http://127.0.0.1:8000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🌍 Production Deployment Readiness

This repository is fully configured for 1-click deployments to modern cloud platforms.

### Frontend -> Vercel
The frontend contains a `vercel.json` file designed to handle React Router's client-side routing.
1. Connect your GitHub repository to Vercel.
2. Set the Root Directory to `frontend`.
3. Add your `VITE_API_URL` (pointing to your live backend) in the Vercel Environment Variables.
4. Deploy!

### Backend -> Render
The backend contains a `render.yaml` and `Dockerfile` for zero-configuration deployments.
1. Connect your GitHub repository to Render using a "Web Service".
2. Set the Root Directory to `backend`.
3. Select "Docker" as the runtime environment.
4. Add your Environment Variables (`DB_URI`, `APP_KEY`, `OPENROUTER_API_KEY`, etc.).
5. Deploy!

---

## 📄 License
This project is proprietary and intended as a SaaS product foundation.
