
import React, { useState, useEffect, useCallback } from 'react';
import { Task, Priority, ParsedTaskData } from './types';
import { TaskInputForm } from './components/TaskInputForm';
import { TaskList } from './components/TaskList';
import { Modal } from './components/Modal';
import { EditTaskForm } from './components/EditTaskForm';
import { parseTaskWithGemini } from './services/geminiService';
import { mapStringToPriority } from './utils/taskUtils';
import { DEFAULT_PRIORITY_STRING } from './constants';
import { LandingPage } from './components/LandingPage'; // Import LandingPage

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showLandingPage, setShowLandingPage] = useState(true); // State for landing page

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = async (naturalLanguageInput: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const parsedData: ParsedTaskData = await parseTaskWithGemini(naturalLanguageInput);
      const newTask: Task = {
        id: crypto.randomUUID(),
        originalInput: naturalLanguageInput,
        taskName: parsedData.taskName || "Untitled Task",
        assignee: parsedData.assignee,
        dueDate: parsedData.dueDate,
        dueTime: parsedData.dueTime,
        priority: mapStringToPriority(parsedData.priority || DEFAULT_PRIORITY_STRING),
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setTimeout(() => setError(null), 7000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  const handleSaveEditedTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null); 
  };

  const handleLaunchApp = () => {
    setShowLandingPage(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-background-end text-text">
      <main className={`flex-grow ${showLandingPage ? 'flex flex-col' : ''}`}>
        {showLandingPage ? (
          <LandingPage onLaunchApp={handleLaunchApp} />
        ) : (
          <div className="py-12 px-4 sm:px-6 lg:px-8"> {/* App specific padding */}
            <div className="max-w-3xl mx-auto">
              <header className="mb-12 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  Natural Language Task Manager
                </h1>
                <p className="mt-4 text-lg text-text-muted">
                  Simply type your to-do and let AI organize it for you.
                </p>
              </header>

              {error && (
                <div 
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg shadow-md" 
                  role="alert"
                >
                  <strong className="font-semibold">Error:</strong> {error}
                </div>
              )}

              <div className="mb-8 p-6 sm:p-8 bg-pane backdrop-blur-md shadow-2xl rounded-xl border border-pane-border">
                <TaskInputForm onAddTask={handleAddTask} isLoading={isLoading} />
              </div>
              
              <div className="p-6 sm:p-8 bg-pane backdrop-blur-md shadow-2xl rounded-xl border border-pane-border">
                <TaskList
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleOpenEditModal}
                />
              </div>

              {editingTask && (
                <Modal isOpen={!!editingTask} onClose={handleCloseEditModal} title="Edit Task">
                  <EditTaskForm
                    task={editingTask}
                    onSave={handleSaveEditedTask}
                    onCancel={handleCloseEditModal}
                  />
                </Modal>
              )}
            </div>
          </div>
        )}
      </main>
      <footer className="text-center py-8 text-sm text-text-muted/80">
          <p>Powered by React, Tailwind CSS, and Gemini API.</p>
          <p>&copy; {new Date().getFullYear()} TaskMaster AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
