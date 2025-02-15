# DevTrends Dashboard

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://your-vercel-app-url.vercel.app)
[![Next.js Version](https://img.shields.io/badge/Next.js-14.1.0-000000?logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A real-time developer trends **[dashboard](https://devtrends.vercel.app/)** aggregating data from GitHub, npm, and Stack Overflow.

![Dashboard Preview](public/screenshot.png)

## Features

🔍 **Trend Discovery**

- Real-time GitHub trending repositories
- npm package download comparisons
- Timeframe filters (7d/30d/1y)
- Regional trend filtering

📊 **Data Visualization**

- Interactive charts (Chart.js)
- Responsive tables
- Language popularity badges
- Download trend comparisons

⚡ **Modern Tech Stack**

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- React Query (Data fetching)
- Vercel Hosting

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- GitHub Personal Access Token

### Installation

```bash
# Clone repository
git clone https://github.com/imay-dev/devtrends.git

# Install dependencies
npm install

# Create environment file
cp env.example .env.local
```
