import React, { memo } from 'react';
import { Preset, DeviceType } from '../types';
import { Smartphone, Monitor, Laptop, Tablet } from 'lucide-react';

interface ViewportProps {
  preset: Preset;
  url: string;
  scale: number;
}

const getIcon = (type: DeviceType) => {
  switch (type) {
    case DeviceType.MOBILE: return <Smartphone size={16} />;
    case DeviceType.TABLET: return <Tablet size={16} />;
    case DeviceType.LAPTOP: return <Laptop size={16} />;
    case DeviceType.DESKTOP: return <Monitor size={16} />;
    default: return <Monitor size={16} />;
  }
};

const Viewport: React.FC<ViewportProps> = memo(({ preset, url, scale }) => {
  // The scaled dimensions for the container
  const containerWidth = preset.width * scale;
  const containerHeight = preset.height * scale;

  return (
    <div className="flex flex-col bg-surface rounded-lg shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:border-primary/50">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
          <span className="text-primary">{getIcon(preset.type)}</span>
          <span>{preset.name}</span>
        </div>
        <div className="text-xs text-muted font-mono">
          {preset.width} × {preset.height}
        </div>
      </div>

      {/* Iframe Container */}
      <div 
        className="relative bg-white overflow-hidden"
        style={{ 
          width: containerWidth, 
          height: containerHeight 
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: preset.width,
            height: preset.height,
            transform: `scale(${scale})`,
          }}
        >
          {url ? (
            <iframe
              /* 
                 key={url} ensures that if the URL changes, React tears down 
                 the old iframe and creates a new one, preventing history/state issues.
              */
              key={url}
              src={url}
              title={`Preview ${preset.name}`}
              className="w-full h-full border-0"
              /*
                 referrerPolicy="no-referrer" helps bypass some basic hotlink/embedding protections
                 that check the Referer header (so they don't see 'localhost').
              */
              referrerPolicy="no-referrer"
              /* 
                 Permissive sandbox settings to allow scripts and forms to work, 
                 while still theoretically being 'sandboxed'. 
                 Removing sandbox entirely is also an option, but this set is standard for previews.
              */
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-modals"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
              <Monitor size={48} className="mb-4 opacity-20" />
              <p>No URL loaded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  // Only re-render if props change. 
  // Note: Parent uses a key (preset.id + version) which bypasses this memo when version changes.
  return prev.url === next.url && prev.scale === next.scale && prev.preset.id === next.preset.id;
});

export default Viewport;