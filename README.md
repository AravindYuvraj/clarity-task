
# Natural Language Task Manager

A modern, enterprise-grade inspired to-do list application that allows users to input tasks using natural language. The application leverages the Google Gemini API to parse these inputs, extract key details like task name, assignee, due date/time, and priority, and displays them in a structured and editable task board.

The application features a beautiful, responsive UI built with React and Tailwind CSS, and includes a welcoming landing page.

## Features

*   **Natural Language Task Input**: Add tasks like "Call John tomorrow 3pm P1" or "Finish Q3 report by Friday for Marketing Team".
*   **AI-Powered Parsing**: Uses Google Gemini API to intelligently extract:
    *   Task Name
    *   Assignee
    *   Due Date & Time
    *   Priority (P1-P4, defaults to P3)
*   **Beautiful UI Task Board**: Displays parsed tasks in a clean, organized list.
    *   Frosted glass design elements.
    *   Responsive design for various screen sizes.
*   **Task Management**:
    *   Mark tasks as complete/incomplete.
    *   Edit task details (name, assignee, due date, due time, priority).
    *   Delete tasks.
*   **Landing Page**: An inviting introductory page showcasing the app's capabilities.
*   **Local Persistence**: Tasks are saved in the browser's `localStorage`.
*   **Error Handling**: Provides feedback for API errors or invalid inputs.

## Tech Stack

*   **Frontend**: React (via CDN), TypeScript
*   **Styling**: Tailwind CSS (via CDN)
*   **AI**: Google Gemini API (`@google/genai` via CDN)
*   **Icons**: Custom SVG icons
*   **Build/Setup**: No complex build process required; runs directly in the browser.

## Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
*   A **Google Gemini API Key**. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

## Setup and Running the Application
Clone the repo:git clone https://github.com/your-username/clarity-task

Create a .env.local file: GEMINI_API_KEY=your-api-key-here

Install dependencies: 'npm install' 

Run the command : 'npm run dev'

It will give you a link to the application click on it.

### 3. Start Using the App

*   You should see the landing page.
*   Click "Launch Task Manager" to go to the main application.
*   Try adding tasks like "Schedule a meeting with marketing for next Tuesday at 2 PM P2".

## Project Structure

```
.
├── README.md                 # This file
├── index.html                # Main HTML entry point, includes Tailwind CSS and React CDN links
├── index.tsx                 # Main React application entry point (renders App.tsx)
├── metadata.json             # Application metadata
├── types.ts                  # TypeScript type definitions (Task, Priority, etc.)
├── constants.ts              # Global constants (e.g., Gemini model name)
├── utils/
│   └── taskUtils.ts          # Utility functions for tasks (formatting, priority styling)
├── services/
│   └── geminiService.ts      # Service for interacting with the Gemini API
├── components/
│   ├── App.tsx               # Main application component, handles state and logic
│   ├── LandingPage.tsx       # Landing page component
│   ├── TaskInputForm.tsx     # Form for adding new tasks
│   ├── TaskList.tsx          # Component to display the list of tasks
│   ├── TaskItem.tsx          # Component for a single task item
│   ├── Modal.tsx             # Reusable modal component (for editing tasks)
│   ├── EditTaskForm.tsx      # Form for editing tasks within the modal
│   └── icons/                # SVG icon components
│       ├── DeleteIcon.tsx
│       ├── EditIcon.tsx
│       ├── SparkleIcon.tsx
│       └── SpinnerIcon.tsx
└── (No package.json or node_modules as dependencies are via CDN)
