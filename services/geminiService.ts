
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ParsedTaskData, Priority } from '../types';
import { GEMINI_MODEL_NAME, DEFAULT_PRIORITY_STRING } from '../constants';
import { mapStringToPriority } from '../utils/taskUtils';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Gemini Service will not function.");
}
// Initialize GoogleGenAI only if API_KEY is available.
// Functions will check for 'ai' instance before making calls.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const getCurrentDateISO = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generatePrompt = (naturalLanguageInput: string): string => {
  const currentDate = getCurrentDateISO();
  const currentYear = currentDate.substring(0, 4);
  const nextYear = (parseInt(currentYear) + 1).toString();

  return `
You are an intelligent task parsing assistant. Your goal is to extract specific details from a user's natural language input for a to-do list.
The user will provide a sentence describing a task. You need to identify:
1.  'taskName': The main description of the task. This should be concise.
2.  'assignee': The person or entity responsible for the task. If no specific assignee is mentioned, or if it's ambiguous (e.g., "me", "I"), return null. Only extract explicit names or roles (e.g., "John", "Marketing Team").
3.  'dueDate': The date the task is due. Return this in YYYY-MM-DD format.
    - The current date for your reference is: ${currentDate}.
    - Interpret relative dates (e.g., "today", "tomorrow", "next Monday") based on this provided current date.
    - If a date like "June 20th" is mentioned without an explicit year:
        - If "June 20th" of the current year (${currentYear}) has not yet passed (compared to ${currentDate}), assume the current year (${currentYear}).
        - If "June 20th" of the current year (${currentYear}) has already passed (compared to ${currentDate}), assume the next year (${nextYear}).
    - If an explicit year is provided (e.g., "June 20th 2026"), use that explicit year.
    - If no due date is mentioned, return null.
4.  'dueTime': The time the task is due. Return this in HH:MM (24-hour) format. If no specific time is mentioned (e.g. "by 11pm"), extract it. If only a date is present and time is ambiguous like "by end of day", you can use "17:00". If no due date is present, dueTime should also be null. If no time is mentioned at all with a date, dueTime can be null.
5.  'priority': The task's priority level. This can be "P1", "P2", "P3", or "P4".
    - If "P1", "high priority", "urgent", or similar terms are used, set priority to "P1".
    - If "P2", "medium priority", or similar terms are used, set priority to "P2".
    - If "P4", "low priority", or similar terms are used, set priority to "P4".
    - If no priority is explicitly mentioned, or if it's ambiguous, default to "P3".

Input: "${naturalLanguageInput}"

Respond ONLY with a single JSON object in the following format. Do not include any explanations or conversational text outside of the JSON object.
Ensure all string values in the JSON are properly escaped if they contain special characters.

{
  "taskName": "string | null",
  "assignee": "string | null",
  "dueDate": "YYYY-MM-DD | null",
  "dueTime": "HH:MM | null",
  "priority": "P1" | "P2" | "P3" | "P4"
}
`;
};

export const parseTaskWithGemini = async (naturalLanguageInput: string): Promise<ParsedTaskData> => {
  if (!ai) {
    throw new Error("Gemini API client is not initialized. Check API_KEY.");
  }
  if (!naturalLanguageInput.trim()) {
    throw new Error("Input cannot be empty.");
  }

  const prompt = generatePrompt(naturalLanguageInput);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1, // Lowered temperature further for more deterministic date parsing
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsed = JSON.parse(jsonStr) as Omit<ParsedTaskData, 'priority'> & { priority: string };

    return {
      taskName: parsed.taskName || "Untitled Task",
      assignee: parsed.assignee,
      dueDate: parsed.dueDate,
      dueTime: parsed.dueTime,
      priority: mapStringToPriority(parsed.priority || DEFAULT_PRIORITY_STRING),
    };

  } catch (error) {
    console.error("Error parsing task with Gemini:", error);
    // Fallback for critical Gemini failure: try to use input as task name
    if (error instanceof Error && error.message.includes("Candidate was blocked due to SAFETY")) {
         throw new Error("Task content was blocked due to safety settings. Please rephrase.");
    }
    throw new Error(`Failed to parse task with AI. ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
