
import React from 'react';

interface LandingPageProps {
  onLaunchApp: () => void;
}

const SpeechBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const AiChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const ChecklistIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
    <polyline points="9 5 9 3 15 3 15 5"></polyline>
    <path d="m9 14 2 2 4-4"></path>
  </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  const features = [
    {
      icon: <SpeechBubbleIcon className="text-primary mb-4" />,
      title: 'Natural Language Input',
      description: 'Add tasks just like you think or say them. No more rigid forms, just flow.',
    },
    {
      icon: <AiChipIcon className="text-primary mb-4" />,
      title: 'AI-Powered Parsing',
      description: 'Our smart AI automatically extracts due dates, assignees, and priorities for you.',
    },
    {
      icon: <ChecklistIcon className="text-primary mb-4" />,
      title: 'Beautifully Organized',
      description: 'View your tasks in a clean, intuitive, and beautifully designed interface.',
    },
  ];

  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-4xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
          The Future of Task Management is <span className="text-primary">Intelligent</span>.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
          Transform your to-do list with cutting-edge AI. Simply type your tasks in natural language,
          and let our smart system organize everything for you, effortlessly.
        </p>

        <div className="mt-12 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-pane backdrop-blur-md p-6 rounded-xl border border-pane-border shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-center md:justify-start">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mt-2 mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted">{feature.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onLaunchApp}
          className="bg-primary hover:bg-primary-light text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-150 ease-in-out shadow-lg hover:shadow-primary/50 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-dark focus:ring-opacity-50 flex items-center justify-center mx-auto"
        >
          Launch Task Manager
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};
