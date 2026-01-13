# www.rakshaaaa.com

Portfolio website for Raksha — Product & Brand Design.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rakshaa/www.rakshaaaa.com.git
   cd www.rakshaaaa.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables (optional):
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page
├── components/             # React components
│   └── PortfolioHeroSection.tsx  # Main portfolio hero component
├── lib/                    # Utility functions
│   └── utils.ts            # Helper utilities
├── styles/                 # Global styles
│   └── globals.css         # Tailwind CSS imports
├── public/                 # Static assets
└── ...config files
```

## Features

- Interactive chat interface with drag-and-drop project cards
- Responsive design with mobile-first approach
- Smooth animations with Framer Motion
- SEO optimized with Open Graph and Twitter Card metadata
- Accessible with ARIA labels and semantic HTML

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/):

```bash
npm run build
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

Private - All rights reserved.
