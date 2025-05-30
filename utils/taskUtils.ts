import { Task, Priority } from '../types';

export const formatTaskDueDate = (task: Task): string => {
  if (!task.dueDate) return "No due date";

  try {
    const dateParts = task.dueDate.split('-');
    if (dateParts.length !== 3 || dateParts.some(part => isNaN(parseInt(part)))) {
        // If not YYYY-MM-DD or parts are not numbers, return raw, this shouldn't happen with Gemini's expected output
        return `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ''}`;
    }
    
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; 
    const day = parseInt(dateParts[2]);

    let hours = 0;
    let minutes = 0;

    if (task.dueTime) {
        const timeParts = task.dueTime.split(':');
        if (timeParts.length === 2 && !timeParts.some(part => isNaN(parseInt(part)))) {
            hours = parseInt(timeParts[0]);
            minutes = parseInt(timeParts[1]);
        }
    }
    
    // Validate date components to prevent invalid date creation
    if (month < 0 || month > 11 || day < 1 || day > 31 || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
       return `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ''}`; // Fallback for invalid components
    }

    const date = new Date(Date.UTC(year, month, day, hours, minutes));


    if (isNaN(date.getTime())) {
      return `${task.dueDate}${task.dueTime ? ` at ${task.dueTime}` : ''}`;
    }

    let options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' // Specify UTC if date was UTC
    };

    if (task.dueTime) {
      options = {...options, hour: 'numeric', minute: 'numeric', hour12: true };
    }
    // Use a specific locale like 'en-US' for consistency or undefined for user's locale
    return date.toLocaleString('en-US', options);

  } catch (error) {
    console.error("Error formatting date for task:", task, error);
    return `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ''}`; 
  }
};

// Updated to use Tailwind classes derived from the config (e.g., bg-priority-p1)
export const getPriorityStyles = (priority: Priority): { badge: string, border: string, text: string } => {
  switch (priority) {
    case Priority.P1:
      return { badge: "bg-priority-p1", border: "border-priority-p1", text: "text-priority-p1" };
    case Priority.P2:
      return { badge: "bg-priority-p2", border: "border-priority-p2", text: "text-priority-p2" };
    case Priority.P3:
      return { badge: "bg-priority-p3", border: "border-priority-p3", text: "text-priority-p3" };
    case Priority.P4:
      return { badge: "bg-priority-p4", border: "border-priority-p4", text: "text-priority-p4" };
    default:
      return { badge: "bg-gray-500", border: "border-gray-500", text: "text-gray-700" };
  }
};

export const mapStringToPriority = (priorityStr: string | Priority): Priority => {
  if (Object.values(Priority).includes(priorityStr as Priority)) {
    return priorityStr as Priority;
  }
  switch(priorityStr?.toUpperCase()) {
    case 'P1': return Priority.P1;
    case 'P2': return Priority.P2;
    case 'P3': return Priority.P3;
    case 'P4': return Priority.P4;
    default: return Priority.P3; 
  }
}