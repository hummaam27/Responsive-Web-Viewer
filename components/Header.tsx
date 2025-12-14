import React from 'react';
import { RefreshCw, Layout, ZoomIn, AlertCircle } from 'lucide-react';
import { MIN_SCALE, MAX_SCALE } from '../constants';

interface HeaderProps {
  inputUrl: string;
  onInputChange: (val: string) => void;
  onLoad: () => void;
  scale: number;
  onScaleChange: (val: number) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  inputUrl, 
  onInputChange, 
  onLoad, 
  scale, 
  onScaleChange 
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onLoad();
    }
  };

  return (
    <header className="flex-none bg-surface border-b border-gray-700 p-4 shadow-md z-10 w-full">
      <div className="w-full flex flex-col md:flex-row items-center gap-4 justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Layout />
          <span className="hidden sm:inline">RespView</span>
        </div>

        {/* URL Input */}
        <div className="flex-1 w-full max-w-3xl flex gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter URL (e.g., localhost:3000 or example.com)"
            className="flex-1 bg-background border border-gray-600 rounded-md px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-500"
          />
          <button
            onClick={onLoad}
            className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Load</span>
          </button>
        </div>

        {/* Scale Control */}
        <div className="flex items-center gap-3 w-full md:w-auto bg-background px-4 py-2 rounded-full border border-gray-700">
          <ZoomIn size={16} className="text-muted" />
          <input
            type="range"
            min={MIN_SCALE}
            max={MAX_SCALE}
            step={0.05}
            value={scale}
            onChange={(e) => onScaleChange(parseFloat(e.target.value))}
            className="w-full md:w-32 accent-primary cursor-pointer"
          />
          <span className="text-xs text-muted w-8 font-mono">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>
      
      {/* Help Tip */}
      <div className="mt-2 text-center md:text-left md:ml-32 text-xs text-yellow-500/80 flex items-center gap-1 justify-center md:justify-start">
        <AlertCircle size={12} />
        <span>Note: Some websites (e.g. Google, GitHub) block embedding via security headers (X-Frame-Options).</span>
      </div>
    </header>
  );
};

export default Header;