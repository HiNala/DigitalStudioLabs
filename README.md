# Digital Studio Labs - Web Application

A modern web application built with React (Vite), Express, and Tailwind CSS. The application features a responsive UI with a React frontend and Express backend API.

## Project Structure

- `/client` - Frontend React application built with Vite
- `/server` - Express API backend
- `/shared` - Shared code between frontend and backend
- `/dist` - Build output directory

## Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Express.js
- **Styling**: Tailwind CSS
- **Build Tools**: Vite, esbuild
- **API**: RESTful Express endpoints
- **Form Validation**: Zod

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server (Windows):
   ```
   npm run dev:windows
   ```

   For macOS/Linux:
   ```
   npm run dev
   ```

3. The application will be available at http://localhost:5000

## Building for Production

Build the application with:
```
npm run build
```

This creates:
- Client-side bundle in `/dist/public`
- Server-side bundle at `/dist/index.js`

## Deployment to Vercel

This application is configured for easy deployment to Vercel.

### Steps to Deploy:

1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Use the following settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

The Vercel configuration files (`vercel.json` and `server/vercel.js`) handle the routing and API endpoints automatically. Vercel will use the serverless function for API routes and serve the static frontend.

## API Endpoints

- **POST /api/contact** - Contact form submission
- **POST /api/subscribe** - Newsletter subscription

## Running on Production

After deployment, the application will be running on your Vercel URL.

For local production testing:
```
npm run start
``` 