
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onAboutClick: () => void;
  onGlossaryClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode, onAboutClick, onGlossaryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <img 
          src={isDarkMode ? logoDark : logoLight} 
          alt="RMH: The Multilevel Musicianship Curriculum at Columbia University" 
          className="h-8 md:h-12"
        />
      </div>
      
      {/* Desktop/Tablet Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <button 
          onClick={onToggleDarkMode}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={onGlossaryClick}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Glossary
        </button>
        <button
          onClick={onAboutClick}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          About
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={() => handleMenuItemClick(onToggleDarkMode)}
                className="text-left py-3 px-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => handleMenuItemClick(onGlossaryClick)}
                className="text-left py-3 px-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                Glossary
              </button>
              <button
                onClick={() => handleMenuItemClick(onAboutClick)}
                className="text-left py-3 px-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                About
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
