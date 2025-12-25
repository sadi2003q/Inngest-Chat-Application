
# Inngest Chat Application with Google Gemini

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, responsive chat application built with React, TypeScript, and Vite, featuring real-time AI-powered conversations with Google's Gemini model, all orchestrated by Inngest.

## Overview

This project is a powerful demonstration of how to build a modern web-based chat interface that integrates with a large language model (LLM). It uses Inngest to reliably manage the communication flow and background jobs between the frontend application and the Google Gemini API. The frontend is built with React and styled with Tailwind CSS and Material UI for a clean and responsive user experience.

## Screenshot

*(A placeholder for a screenshot of your application)*
![App Screenshot](https://via.placeholder.com/800x500.png?text=Inngest+Chat+Application)

## Features

- **Real-time AI Chat:** Engage in dynamic conversations with the Google Gemini Pro model.
- **Chat-Context:** Keep track of previous messages to answer the next. Memory implementation.
- **Reliable Job Orchestration:** Uses Inngest to manage and ensure the reliable execution of AI response generation.
- **Modern Frontend:** Built with React, Vite, and TypeScript for a fast and type-safe development experience.
- **Responsive Design:** Styled with Tailwind CSS and Material UI for a great look on all devices.
- **Markdown & Syntax Highlighting:** Renders chat responses with proper formatting for code blocks and other markdown features.
- **Scalable Architecture:** The use of Inngest allows for easy scaling and the addition of more complex, event-driven features.

## Tech Stack

**Frontend:**
- **Framework:** React 19
- **Bundler:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Material UI, Emotion
- **Icons:** Lucide React
- **Markdown:** React Markdown, Remark GFM, Rehype Highlight

**Backend & Orchestration:**
- **Orchestration:** Inngest
- **AI:** Google Gemini Pro (`@google/genai`)

**Development:**
- **Linting:** ESLint
- **Package Manager:** npm

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/inngest-chat-application.git
    cd inngest-chat-application
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file in the root of your project.

Create a file named `.env` and add the following:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

- `VITE_GEMINI_API_KEY`: Your API key for the Google Gemini service.

You may also need to configure an `INNGEST_EVENT_KEY` if you deploy your application and use Inngest Cloud's signed events.

## Usage

To start the development server, run the following command. The application will be available at `http://localhost:5173` by default (Vite's default port).

```bash
npm run dev
```

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Serves the production build locally for preview.

## Project Structure

Here is an overview of the key files and directories in this project:

```
.
├── src
│   ├── components/      # Reusable React components
│   ├── pages/           # Main application pages/views
│   ├── services/        # Services for APIs (e.g., Gemini, Inngest)
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point of the React application
├── public/              # Static assets
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
