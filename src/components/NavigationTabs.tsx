
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  onAddPath: () => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  onAddPath
}) => {
  const getTabStyles = (tabName: string) => {
    if (activeTab === tabName) {
      switch (tabName) {
        case 'rhythm':
          return 'bg-[hsl(var(--tab-rhythm))] text-white rounded-lg';
        case 'melody':
          return 'bg-[hsl(var(--tab-melody))] text-white rounded-lg';
        case 'harmony':
          return 'bg-[hsl(var(--tab-harmony))] text-white rounded-lg';
        default:
          return 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-lg';
      }
    }
    return 'hover:bg-accent hover:text-accent-foreground';
  };

  return (
    <>
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col gap-4 mb-6 md:hidden">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="grid w-full grid-cols-3 bg-card border border-border rounded-lg">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-center ${getTabStyles('rhythm')}`}
                onClick={() => onTabChange('rhythm')}
              >
                Rhythm
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-center ${getTabStyles('melody')}`}
                onClick={() => onTabChange('melody')}
              >
                Melody
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-center ${getTabStyles('harmony')}`}
                onClick={() => onTabChange('harmony')}
              >
                Harmony
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Button
          onClick={onAddPath}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 w-full"
        >
          Add a Path
        </Button>
      </div>

      {/* Desktop/Tablet Layout - Side by Side */}
      <div className="hidden md:flex items-center justify-between mb-6">
        <NavigationMenu>
          <NavigationMenuList className="grid w-auto grid-cols-3 bg-card border border-border rounded-lg">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-6 py-2 cursor-pointer flex items-center justify-center ${getTabStyles('rhythm')}`}
                onClick={() => onTabChange('rhythm')}
              >
                Rhythm
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-6 py-2 cursor-pointer flex items-center justify-center ${getTabStyles('melody')}`}
                onClick={() => onTabChange('melody')}
              >
                Melody
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-6 py-2 cursor-pointer flex items-center justify-center ${getTabStyles('harmony')}`}
                onClick={() => onTabChange('harmony')}
              >
                Harmony
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Button
          onClick={onAddPath}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          Add a Path
        </Button>
      </div>
    </>
  );
};

export default NavigationTabs;
