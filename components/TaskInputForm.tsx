import React, { useState } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SparkleIcon } from './icons/SparkleIcon'; // Added SparkleIcon

interface TaskInputFormProps {
  onAddTask: (naturalLanguageInput: string) => Promise<void>;
  onParseTranscript: (transcript: string) => Promise<void>;
  isLoading: boolean;
}

export const TaskInputForm: React.FC<TaskInputFormProps> = ({ onAddTask, onParseTranscript, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [transcriptValue, setTranscriptValue] = useState('');

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onAddTask(inputValue);
    setInputValue(''); 
  };

  const handleTranscriptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcriptValue.trim() || isLoading) return;
    onParseTranscript(transcriptValue);
    setTranscriptValue('');
  };

  return (
    <div>
      <form onSubmit={handleTaskSubmit} className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-6">Add New Task</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., 'Call John tomorrow 3pm P1'"
            className="flex-grow p-4 bg-white/10 text-text rounded-lg border border-transparent focus:bg-white/20 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150 ease-in-out resize-none placeholder-text-muted/70"
            rows={3}
            disabled={isLoading}
            aria-label="New task input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-light text-white font-semibold py-1 px-4 rounded-md transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-background-end"
          >
            {isLoading ? (
              <SpinnerIcon size="24" className="text-white" />
            ) : (
              <SparkleIcon size="20" className="mr-2 text-yellow-300" />
            )}
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>

      <form onSubmit={handleTranscriptSubmit}>
        <h2 className="text-3xl font-bold text-white mb-6">Parse Meeting Transcript</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={transcriptValue}
            onChange={(e) => setTranscriptValue(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            className="flex-grow p-4 bg-white/10 text-text rounded-lg border border-transparent focus:bg-white/20 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150 ease-in-out resize-none placeholder-text-muted/70"
            rows={5}
            disabled={isLoading}
            aria-label="Transcript input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-secondary hover:bg-secondary-light text-white font-semibold py-1 px-4 rounded-md transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 focus:ring-offset-background-end"
          >
            Parse Transcript
          </button>
        </div>
      </form>
    </div>
  );
};