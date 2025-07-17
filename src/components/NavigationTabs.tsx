
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
  return (
    <>
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col gap-4 mb-6 md:hidden">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="grid w-full grid-cols-3 bg-card border border-border rounded-lg">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 text-xs opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Rhythm
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 text-xs opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Melody
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-center ${
                  activeTab === 'harmony' 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-lg' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
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
                className="px-6 py-2 opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Rhythm
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-6 py-2 opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Melody
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-6 py-2 cursor-pointer flex items-center justify-center ${
                  activeTab === 'harmony' 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-lg' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
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
