# Pen2text-using-Deep-Learning

A modern web application that extracts text from images using Google's Gemini AI Vision and automatically corrects grammar, typos, and incomplete sentences.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## ✨ Features


- **Smart Text Correction** - Automatically fix grammar, typos, and incomplete sentences
- **User Authentication** - Secure JWT-based login and signup system
- **Document History** - View and manage all processed documents
- **Modern UI** - Beautiful, responsive interface with Tailwind CSS
- **Real-time Processing** - Instant feedback on document processing

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Backend | Next.js API Routes, Server Actions |
| Database | MongoDB Atlas + Mongoose |
| ML | Train model (Vision + Text) |
| Auth | JWT (JSON Web Tokens) + bcrypt |

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Google Gemini API key

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd "New apporch"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
```

> **Get your Gemini API key:** Visit [Google AI Studio](https://aistudio.google.com/apikey)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/         # Authentication API routes
│   ├── actions/          # Server actions (document processing)
│   ├── dashboard/        # Dashboard page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── page.tsx          # Landing page
├── components/
│   ├── Dashboard/        # Dashboard components
│   └── Navbar.tsx        # Navigation bar
├── lib/
│   ├── auth.ts           # Auth utilities
│   ├── auth-edge.ts      # Edge-compatible auth
│   ├── db.ts             # Database connection
│   ├── gemini.ts         # Gemini AI for text correction
│   └── ocr.ts            # Gemini Vision for OCR
├── models/
│   ├── Document.ts       # Document schema
│   └── User.ts           # User schema
└── middleware.ts         # Auth middleware
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 📖 How It Works

1. **Upload** - User uploads an image containing text
2. **Extract** - Gemini Vision API extracts raw text from the image
3. **Correct** - Gemini AI corrects grammar and fills in missing words
4. **Save** - Results are saved to MongoDB with user association
5. **History** - Users can view all their processed documents

## 🔐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | Create new user account |
| `/api/auth/login` | POST | User login, returns JWT |
| `/api/auth/logout` | POST | Clear auth cookie |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---
