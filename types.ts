
export enum Priority {
  P1 = "P1", // Highest
  P2 = "P2",
  P3 = "P3", // Default
  P4 = "P4", // Lowest
}

export interface Task {
  id: string;
  originalInput: string;
  taskName: string;
  assignee: string | null;
  dueDate: string | null; // YYYY-MM-DD
  dueTime: string | null; // HH:MM
  priority: Priority;
  isCompleted: boolean;
  createdAt: string; // ISO string
}

export interface ParsedTaskData {
  taskName: string | null;
  assignee: string | null;
  dueDate: string | null; // YYYY-MM-DD
  dueTime: string | null; // HH:MM
  priority: Priority | string; // Gemini might return string, needs conversion
}

// Props for components that need task object
export interface TaskProps {
  task: Task;
}
