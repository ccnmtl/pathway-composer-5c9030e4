
import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onAboutClick: () => void;
  onGlossaryClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode, onAboutClick, onGlossaryClick }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-foreground tracking-wide">Pathway Composer</h1>
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleDarkMode}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer underline"
        >
          Dark Mode
        </button>
        <button
          onClick={onGlossaryClick}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer underline"
        >
          Glossary
        </button>
        <button
          onClick={onAboutClick}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer underline"
        >
          About
        </button>
      </div>
    </div>
  );
};

export default Header;
