import React from 'react';
import { Preset, DeviceType } from '../types';
import { LayoutGrid, Smartphone, Monitor, Laptop, Tablet, Plus, Trash2, Eye, CheckSquare, Square } from 'lucide-react';

interface SidebarProps {
  presets: Preset[];
  visiblePresetIds: string[];
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onSelectOnly: (id: string) => void;
  onAddDevice: () => void;
  onDeleteDevice: (id: string) => void;
}

const getIcon = (type: DeviceType) => {
  switch (type) {
    case DeviceType.MOBILE: return <Smartphone size={18} />;
    case DeviceType.TABLET: return <Tablet size={18} />;
    case DeviceType.LAPTOP: return <Laptop size={18} />;
    case DeviceType.DESKTOP: return <Monitor size={18} />;
    default: return <Monitor size={18} />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ 
  presets, 
  visiblePresetIds, 
  onToggle,
  onSelectAll,
  onSelectOnly,
  onAddDevice,
  onDeleteDevice 
}) => {
  const allSelected = presets.length > 0 && visiblePresetIds.length === presets.length;

  return (
    <aside className="w-72 bg-surface border-r border-gray-700 flex flex-col h-full flex-none z-20 shadow-xl">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">View Mode</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        {/* Select All Option */}
        <button
          onClick={onSelectAll}
          className={`w-full flex items-center gap-3 px-4 py-3 transition-colors group ${
            allSelected
              ? 'bg-primary/20 text-primary border-r-2 border-primary' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
          }`}
        >
          <LayoutGrid size={18} />
          <span className="font-medium flex-1 text-left">Show All Screens</span>
          {allSelected && <span className="text-xs bg-primary/20 px-2 py-0.5 rounded text-primary border border-primary/30">Active</span>}
        </button>

        <div className="my-2 border-t border-gray-700/50 mx-4" />
        
        <div className="flex items-center justify-between px-4 py-2 mt-2 group">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Devices</h3>
          <div className="flex gap-2">
             <button 
              onClick={() => {
                onSelectAll();
              }}
              className="text-[10px] text-primary hover:underline cursor-pointer mr-2"
            >
              Reset
            </button>
            <button 
              onClick={onAddDevice} 
              className="text-gray-500 hover:text-primary hover:bg-primary/10 p-1 rounded transition-all" 
              title="Add Custom Device"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Device List */}
        <div className="space-y-0.5">
          {presets.map((preset) => {
            const isCustom = preset.id.startsWith('custom-');
            const isSelected = visiblePresetIds.includes(preset.id);
            
            return (
              <div 
                key={preset.id}
                className={`w-full flex items-center group/item relative transition-colors ${
                   isSelected
                    ? 'bg-gray-800/50'
                    : 'hover:bg-gray-800/30'
                }`}
              >
                {/* Main Toggle Click */}
                <button
                  onClick={() => onToggle(preset.id)}
                  className="flex-1 flex items-center gap-3 px-4 py-3 text-left outline-none focus:bg-gray-800"
                >
                  <div className={`transition-colors ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                    {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                  </div>
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={isSelected ? 'text-gray-200' : 'text-gray-500'}>
                      {getIcon(preset.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm truncate ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}>
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {preset.width}×{preset.height}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Actions: View Only & Delete */}
                <div className="flex items-center gap-1 pr-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOnly(preset.id);
                    }}
                    className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-700 rounded"
                    title="View Only This Device"
                  >
                    <Eye size={14} />
                  </button>

                  {isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete preset "${preset.name}"?`)) {
                          onDeleteDevice(preset.id);
                        }
                      }}
                      className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded"
                      title="Delete Preset"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-700 text-xs text-gray-500 text-center">
        {visiblePresetIds.length} device{visiblePresetIds.length !== 1 && 's'} visible
      </div>
    </aside>
  );
};

export default Sidebar;