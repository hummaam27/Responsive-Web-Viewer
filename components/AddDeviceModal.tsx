import React, { useState } from 'react';
import { DeviceType, Preset } from '../types';
import { X, Smartphone, Monitor, Laptop, Tablet } from 'lucide-react';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (preset: Preset) => void;
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [width, setWidth] = useState('375');
  const [height, setHeight] = useState('667');
  const [type, setType] = useState<DeviceType>(DeviceType.MOBILE);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !width || !height) return;

    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name,
      width: parseInt(width),
      height: parseInt(height),
      type,
    };

    onAdd(newPreset);
    onClose();
    // Reset form
    setName('');
    setWidth('375');
    setHeight('667');
    setType(DeviceType.MOBILE);
  };

  const getTypeIcon = (t: DeviceType) => {
    switch (t) {
      case DeviceType.MOBILE: return <Smartphone size={16} />;
      case DeviceType.TABLET: return <Tablet size={16} />;
      case DeviceType.LAPTOP: return <Laptop size={16} />;
      case DeviceType.DESKTOP: return <Monitor size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface border border-gray-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
          <h2 className="text-lg font-bold text-white">Add Custom Device</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Device Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. iPhone 15 Pro Max"
              className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              autoFocus
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Width (px)</label>
              <input 
                type="number" 
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                required
                min="100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Height (px)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-background border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                required
                min="100"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Device Type</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(DeviceType).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex flex-col items-center justify-center gap-1 py-3 rounded-lg border transition-all ${
                    type === t 
                      ? 'bg-primary/20 text-primary border-primary' 
                      : 'bg-background text-gray-400 border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                  }`}
                >
                  {getTypeIcon(t)}
                  <span className="text-[10px] font-medium">{t}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-700/50 mt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              Add Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;