
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

The application is designed to run directly from the `index.html` file without a complex build step, primarily relying on CDNs for its dependencies. However, for the Gemini API to function, you **must** configure your API key.

### 1. Configure API Key

The application expects the Gemini API key to be available as an environment variable named `API_KEY` within the context where the JavaScript is executed. Since this is a client-side application without a traditional backend or build process that injects environment variables, you'll need to make it available to the browser's JavaScript environment.

**For local development, the simplest way is to temporarily set it in your browser's console before the `geminiService.ts` script initializes, or by creating a `.env` file (if you were using a bundler). However, for this project structure, we'll use a more direct approach for local testing:**

**Option A: Directly in `index.html` (for quick local testing only - NOT FOR PRODUCTION)**

   *   Open `index.html`.
   *   Before the closing `</head>` tag or at the beginning of the `<body>` tag, add the following script block:

     ```html
     <script>
       // THIS IS FOR LOCAL DEVELOPMENT/TESTING ONLY.
       // DO NOT COMMIT YOUR API KEY TO VERSION CONTROL.
       // Replace 'YOUR_GEMINI_API_KEY' with your actual key.
       if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") {
         process = { env: { API_KEY: 'YOUR_GEMINI_API_KEY' } };
       }
     </script>
     ```

   *   **Important Security Note**:
        *   This method embeds your API key directly in the HTML. **This is highly insecure for production or if you share this code publicly.**
        *   Only use this method for local testing on your machine.
        *   **Ensure this modification is NOT committed to any version control system (e.g., Git) if your key is present.** It's best to add `index.html` to `.gitignore` if you use this method frequently, or be extremely careful.

**Option B: Using a Local Development Server with Environment Variable Simulation (More Advanced)**

   If you are serving the files using a local development server that allows setting global JavaScript variables or injecting scripts, you could use that mechanism. For example, some live server extensions for IDEs might offer such features.

**The application's `services/geminiService.ts` attempts to read `process.env.API_KEY`. The script added in Option A simulates this `process.env` object for browser environments.**

### 2. Open the Application

Once the API key is accessible:

*   **Directly in Browser**:
    Navigate to the project directory and open the `index.html` file in your web browser.
    *Example*: `file:///path/to/your/project/index.html`

*   **Using a Simple HTTP Server (Recommended for better behavior)**:
    For a more robust local development experience (to avoid potential issues with `file:///` paths and CORS if external resources were loaded differently), you can use a simple local HTTP server.
    1.  Ensure you have Node.js installed (which usually includes `npx`).
    2.  Open your terminal or command prompt.
    3.  Navigate to the root directory of the project (where `index.html` is located).
    4.  Run a simple server. For example, using `http-server`:
        ```bash
        npx http-server .
        ```
        Or, if you have Python installed:
        ```bash
        python -m http.server
        ```
    5.  The server will output a local URL (e.g., `http://localhost:8080` or `http://127.0.0.1:8000`). Open this URL in your browser.

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
```

## Important Considerations

*   **API Key Security**: The method described for setting the API key directly in `index.html` is **not secure for production**. In a real-world application, API keys should be handled by a backend proxy or a build system that securely injects them, ensuring they are not exposed directly in client-side code.
*   **Rate Limiting**: Be mindful of the Gemini API rate limits, especially during development and testing.
*   **Error Handling**: The app includes basic error handling for API calls. Check the browser console for more detailed error messages if issues arise.
```