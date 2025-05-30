import React, { useState } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SparkleIcon } from './icons/SparkleIcon'; // Added SparkleIcon

interface TaskInputFormProps {
  onAddTask: (naturalLanguageInput: string) => Promise<void>;
  isLoading: boolean;
}

export const TaskInputForm: React.FC<TaskInputFormProps> = ({ onAddTask, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onAddTask(inputValue);
    setInputValue(''); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-white mb-6">Add New Task</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., 'Call John tomorrow 3pm P1' or 'Finish Q3 report by Friday for Marketing Team'"
          className="flex-grow p-4 bg-white/10 text-text rounded-lg border border-transparent focus:bg-white/20 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150 ease-in-out resize-none placeholder-text-muted/70"
          rows={3}
          disabled={isLoading}
          aria-label="New task input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-lg transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-background-end"
          style={{ minWidth: '130px' }} // Ensure button doesn't resize too much with spinner
        >
          {isLoading ? (
            <SpinnerIcon size="24" className="text-white" />
          ) : (
            <SparkleIcon size="20" className="mr-2 text-yellow-300" />
          )}
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
       <p className="mt-3 text-sm text-text-muted">
        Try specifying task, assignee, due date/time, and priority (P1, P2, P3, P4).
      </p>
    </form>
  );
};