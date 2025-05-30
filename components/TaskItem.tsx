import React from 'react';
import { Task, Priority, TaskProps } from '../types';
import { formatTaskDueDate, getPriorityStyles } from '../utils/taskUtils';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';

interface TaskItemProps extends TaskProps {
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const { badge: priorityBadgeColor } = getPriorityStyles(task.priority);
  
  const handleCheckboxChange = () => {
    onToggleComplete(task.id);
  };

  return (
    <li className={`p-5 bg-card shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl ${task.isCompleted ? 'opacity-70 bg-card-hover' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start flex-grow min-w-0"> {/* Added min-w-0 for text truncation if needed */}
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleCheckboxChange}
            className="mt-1 h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer flex-shrink-0"
            aria-labelledby={`task-name-${task.id}`}
          />
          <div className="ml-4 flex-1">
            <h3 
              id={`task-name-${task.id}`}
              className={`text-lg font-semibold text-text-dark ${task.isCompleted ? 'line-through text-text-muted' : ''}`}
            >
              {task.taskName}
            </h3>
            {task.originalInput && !task.isCompleted && (
                 <p className="text-xs text-gray-400 italic mt-0.5">"{task.originalInput}"</p>
            )}
            <div className={`mt-2 text-sm text-gray-500 space-y-1.5 ${task.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.assignee && (
                <p><span className="font-medium text-text-dark">Assigned to:</span> {task.assignee}</p>
              )}
              <p><span className="font-medium text-text-dark">Due:</span> {formatTaskDueDate(task)}</p>
              <div className="flex items-center">
                <span className="font-medium mr-2 text-text-dark">Priority:</span>
                <span className={`px-2.5 py-0.5 text-xs font-bold text-white rounded-full ${priorityBadgeColor}`}>
                  {task.priority}
                </span>
              </div>
               <p className="text-xs text-gray-400 pt-1">Created: {new Date(task.createdAt).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-1 sm:mt-0 flex-shrink-0">
          <button
            onClick={() => onEditTask(task)}
            className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-text-dark font-medium rounded-md transition-colors shadow-sm border border-gray-200"
            aria-label={`Edit task: ${task.taskName}`}
          >
            <EditIcon size={16} className="mr-1.5" /> Edit
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="flex items-center px-3 py-1.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-md transition-colors shadow-sm border border-red-200"
            aria-label={`Delete task: ${task.taskName}`}
          >
            <DeleteIcon size={16} className="mr-1.5" /> Delete
          </button>
        </div>
      </div>
    </li>
  );
};