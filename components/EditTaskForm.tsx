import React, { useState, useEffect } from 'react';
import { Task, Priority } from '../types';
import { mapStringToPriority } from '../utils/taskUtils';

interface EditTaskFormProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState<Task>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedTask(prev => ({ ...prev, priority: mapStringToPriority(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTask);
  };

  const commonInputClass = "mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-text-dark placeholder-gray-400 bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="taskName" className="block text-sm font-medium text-text-dark">Task Name</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          value={editedTask.taskName}
          onChange={handleChange}
          className={commonInputClass}
          required
        />
      </div>
      <div>
        <label htmlFor="assignee" className="block text-sm font-medium text-text-dark">Assignee</label>
        <input
          type="text"
          id="assignee"
          name="assignee"
          value={editedTask.assignee || ''}
          onChange={handleChange}
          className={commonInputClass}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-text-dark">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={editedTask.dueDate || ''}
            onChange={handleChange}
            className={commonInputClass}
          />
        </div>
        <div>
          <label htmlFor="dueTime" className="block text-sm font-medium text-text-dark">Due Time</label>
          <input
            type="time"
            id="dueTime"
            name="dueTime"
            value={editedTask.dueTime || ''}
            onChange={handleChange}
            className={commonInputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-text-dark">Priority</label>
        <select
          id="priority"
          name="priority"
          value={editedTask.priority}
          onChange={handlePriorityChange}
          className={`${commonInputClass} appearance-none`} // appearance-none to better style custom arrow if needed
        >
          {Object.values(Priority).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-text-dark bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md shadow-sm transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark border border-transparent rounded-md shadow-sm transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};