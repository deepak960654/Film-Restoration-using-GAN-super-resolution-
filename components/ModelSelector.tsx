
import React from 'react';
import { GANModel } from '../types';
import { MODELS } from '../constants';

interface ModelSelectorProps {
  selectedModel: GANModel;
  onModelChange: (model: GANModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const currentModel = MODELS.find(m => m.id === selectedModel);

  return (
    <div className="w-full">
      <label htmlFor="model-select" className="block text-sm font-medium text-gray-400 mb-2">
        Select Restoration Model
      </label>
      <div className="relative">
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value as GANModel)}
          className="w-full appearance-none bg-gray-700 border border-gray-600 text-white py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          {MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {currentModel && (
         <p className="text-xs text-gray-500 mt-2">{currentModel.description}</p>
      )}
    </div>
  );
};
