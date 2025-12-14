import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Viewport from './components/Viewport';
import Sidebar from './components/Sidebar';
import AddDeviceModal from './components/AddDeviceModal';
import { PRESETS, DEFAULT_URL, INITIAL_SCALE } from './constants';
import { Preset } from './types';

const App: React.FC = () => {
  // State initialization
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [scale, setScale] = useState<number>(INITIAL_SCALE);
  
  // Multi-select state
  const [visiblePresetIds, setVisiblePresetIds] = useState<string[]>([]);
  
  // Add a version key to force re-render of iframes when user clicks Load again
  const [loadVersion, setLoadVersion] = useState<number>(0);
  
  // Custom Presets State
  const [customPresets, setCustomPresets] = useState<Preset[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    // URL
    const savedUrl = localStorage.getItem('respview_last_url');
    if (savedUrl) {
      setInputUrl(savedUrl);
      setCurrentUrl(savedUrl);
    } else {
      setInputUrl(DEFAULT_URL);
    }

    // Custom Presets
    const savedPresets = localStorage.getItem('respview_custom_presets');
    let loadedCustomPresets: Preset[] = [];
    if (savedPresets) {
      try {
        loadedCustomPresets = JSON.parse(savedPresets);
        setCustomPresets(loadedCustomPresets);
      } catch (e) {
        console.error("Failed to parse saved presets", e);
      }
    }

    // Initialize selection: Select all by default if no selection logic exists yet
    const allIds = [...PRESETS, ...loadedCustomPresets].map(p => p.id);
    setVisiblePresetIds(allIds);
    
  }, []);

  const handleLoad = () => {
    let urlToLoad = inputUrl.trim();
    
    if (!urlToLoad) return;

    // Smart protocol prepend
    if (!/^https?:\/\//i.test(urlToLoad)) {
      const isLocal = urlToLoad.includes('localhost') || urlToLoad.includes('127.0.0.1');
      urlToLoad = (isLocal ? 'http://' : 'https://') + urlToLoad;
    }

    setCurrentUrl(urlToLoad);
    setLoadVersion(v => v + 1); // Increment version to force refresh
    localStorage.setItem('respview_last_url', urlToLoad);
  };

  const allPresets = [...PRESETS, ...customPresets];

  // Preset Management
  const handleTogglePreset = (id: string) => {
    setVisiblePresetIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(pId => pId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    setVisiblePresetIds(allPresets.map(p => p.id));
    setScale(0.4); // Reset scale for grid view
  };

  const handleSelectOnly = (id: string) => {
    setVisiblePresetIds([id]);
    setScale(1.0); // Auto-zoom for single view
  };

  const handleAddPreset = (preset: Preset) => {
    const newPresets = [...customPresets, preset];
    setCustomPresets(newPresets);
    localStorage.setItem('respview_custom_presets', JSON.stringify(newPresets));
    // Auto-select the new preset
    setVisiblePresetIds(prev => [...prev, preset.id]);
  };

  const handleDeletePreset = (id: string) => {
    const newPresets = customPresets.filter(p => p.id !== id);
    setCustomPresets(newPresets);
    localStorage.setItem('respview_custom_presets', JSON.stringify(newPresets));
    
    // Remove from visible list if present
    setVisiblePresetIds(prev => prev.filter(pId => pId !== id));
  };

  // Filter visible presets
  const visiblePresets = allPresets.filter(p => visiblePresetIds.includes(p.id));

  return (
    <div className="flex h-screen w-screen bg-background text-text overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar 
        presets={allPresets}
        visiblePresetIds={visiblePresetIds}
        onToggle={handleTogglePreset}
        onSelectAll={handleSelectAll}
        onSelectOnly={handleSelectOnly}
        onAddDevice={() => setIsModalOpen(true)}
        onDeleteDevice={handleDeletePreset}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Header
          inputUrl={inputUrl}
          onInputChange={setInputUrl}
          onLoad={handleLoad}
          scale={scale}
          onScaleChange={setScale}
        />

        <main className="flex-1 overflow-auto p-6 bg-slate-900/50">
          {visiblePresets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p className="text-lg font-medium">No screens selected</p>
              <p className="text-sm">Select devices from the sidebar to preview</p>
            </div>
          ) : (
            <div className={`
              flex flex-wrap gap-8 justify-center
              items-start content-start pb-20 min-h-full
            `}>
              {visiblePresets.map((preset) => (
                <Viewport
                  key={`${preset.id}-${loadVersion}`}
                  preset={preset}
                  url={currentUrl}
                  scale={scale}
                />
              ))}
            </div>
          )}
        </main>
        
        {/* Modal */}
        <AddDeviceModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddPreset} 
        />
      </div>
    </div>
  );
};

export default App;