# NS2 Infotech - Frontend

This is the frontend application for NS2 Infotech (Modern Institute of Automation), built with Next.js 15.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & Vanilla CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Components**: Client & Server components for optimized performance

## Key Features

- **Dynamic Content**: Data-driven homepage components managed via a backend API.
- **Premium Design**: Modern, responsive UI with glassmorphism and smooth animations.
- **Interactive Forms**: Robust contact forms with client-side validation.
- **SEO Optimized**: Pre-configured meta tags and semantic HTML structure.

### Prerequisites

- Node.js 18.x or later
- pnpm / npm / yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and API helpers.
- `public`: Static assets like images and icons.

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com).

