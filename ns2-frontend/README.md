# NS2 Infotech - Frontend

This is the frontend application for NS2 Infotech (Modern Institute of Automation), built with the Next.js 15 framework.

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
- **Performance Optimized**: Image optimization and efficient server-side rendering.

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

- `src/app`: Next.js App Router pages and layouts. Handles routing and server-side logic.
- `src/components`: Reusable UI components.
  - `homepage/`: Section-specific components for the landing page.
  - `common/`: Shared components like Buttons, Inputs, and Cards.
  - `layout/`: Global layout components (Navbar, Footer).
- `src/lib`: Core logic, including API clients (`api.js`) and utility functions.
- `src/styles`: Global CSS, Tailwind configuration, and design tokens.
- `public`: Static assets like images, icons, and fonts.

## Architecture & Conventions

### Component Guidelines
- **Server vs. Client**: Use Server Components by default for better performance and SEO. Use `"use client"` only when interactive features (hooks, event listeners) are required.
- **Styling**: Prefer Tailwind CSS for layout and spacing. Use Vanilla CSS for complex, custom animations or unique design patterns that are hard to express in Tailwind.
- **Data Fetching**: Use the centralized `src/lib/api.js` for all backend interactions to ensure consistent error handling and URL normalization.

### State Management
- **Server State**: Managed primarily via Next.js server-side data fetching and SWR for client-side revalidation.
- **UI State**: Handled locally using React `useState` and `useReducer` for complex interactions.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with hot reloading.
- `npm run build`: Optimizes the application for production deployment.
- `npm run start`: Serves the production build.
- `npm run lint`: Performs static analysis to ensure code quality and style consistency.

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com).

## Contribution Guidelines

- Use descriptive commit messages.
- Maintain consistent code style using Prettier.
- Ensure all components are responsive.
- Document complex logic using JSDoc.

