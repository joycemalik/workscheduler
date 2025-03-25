# AI-Powered Task Management Application

A modern task management application built with Next.js, featuring AI-powered task prioritization and an intelligent chatbot assistant.

## Features

- 🔐 Secure Authentication (Google, GitHub, and Email)
- ✅ Task Management (Create, Update, Delete, Complete)
- 🤖 AI-Powered Task Prioritization
- 💬 AI Chat Assistant
- 🎯 Smart Task Scheduling
- 📱 Responsive Design
- 🌙 Dark Mode Support

## Tech Stack

- **Framework**: Next.js 14
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Prisma with PostgreSQL
- **AI Integration**: Nimbus AI
- **Icons**: Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joycemalik/workscheduler.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# NextAuth.js Configuration
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Nimbus AI Configuration
NIMBUS_API_KEY="your-nimbus-api-key"
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add the environment variables in Vercel's dashboard
4. Deploy!

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
├── app/
│   ├── api/            # API routes
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # Dashboard pages
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/               # Utility functions
├── styles/            # Global styles
└── types/            # TypeScript types
```

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/tasks` - Task management
- `/api/chat` - AI chat functionality
- `/api/tasks/prioritize` - AI task prioritization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) 