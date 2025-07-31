# SHANAYA LIVE

A React application built with Vite, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

To build the application for production:

```bash
npm run build
```

### Preview Production Build

To preview the production build:

```bash
npm run preview
```

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics & Speed Insights

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── data/          # Static data and constants
└── assets/        # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Analytics

This project includes Vercel Analytics and Speed Insights for tracking website performance and user behavior:

### Vercel Analytics
- **Page Views**: Automatically tracks page views and navigation
- **Visitor Analytics**: Collects visitor data and demographics
- **Real-time Data**: View analytics in real-time on Vercel dashboard

### Speed Insights
- **Performance Monitoring**: Tracks Core Web Vitals and page load times
- **User Experience Metrics**: Monitors real user performance data
- **Performance Alerts**: Get notified of performance issues

### Setup
The analytics components are automatically included in the main App component:
- `<Analytics />` - Tracks page views and visitor data
- `<SpeedInsights />` - Monitors performance metrics

### Viewing Analytics
1. Deploy your site to Vercel
2. Visit your Vercel dashboard
3. Navigate to the "Analytics" tab
4. View real-time visitor and performance data

**Note**: Analytics data may take 30-60 seconds to appear after deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary.
