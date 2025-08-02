import React, { useState } from 'react';
import { Save, Key, ExternalLink, Bell, Palette, Settings as SettingsIcon } from 'lucide-react';
import { useStore } from '../stores/useStore';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showApiKeys, setShowApiKeys] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    // Show success message
    alert('Settings saved successfully!');
  };

  const apiProviders = [
    {
      name: 'OpenAI',
      key: 'openai',
      description: 'GPT models for natural language processing',
      docsUrl: 'https://platform.openai.com/api-keys',
    },
    {
      name: 'Anthropic',
      key: 'anthropic', 
      description: 'Claude models for advanced reasoning',
      docsUrl: 'https://console.anthropic.com/',
    },
    {
      name: 'Perplexity',
      key: 'perplexity',
      description: 'Real-time search and research capabilities',
      docsUrl: 'https://docs.perplexity.ai/',
    },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Key size={20} className="mr-2" />
              API Configuration
            </h2>
            <button
              onClick={() => setShowApiKeys(!showApiKeys)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {showApiKeys ? 'Hide' : 'Show'} API Keys
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {apiProviders.map((provider) => (
            <div key={provider.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.description}</p>
                </div>
                <a
                  href={provider.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                >
                  Get API Key <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
              
              <input
                type={showApiKeys ? "text" : "password"}
                value={localSettings.apiConfig[provider.key] || ''}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  apiConfig: {
                    ...localSettings.apiConfig,
                    [provider.key]: e.target.value,
                  },
                })}
                placeholder={`Enter your ${provider.name} API key`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <SettingsIcon size={20} className="mr-2" />
            General Settings
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Theme */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Palette size={16} className="mr-2" />
              Theme
            </label>
            <select
              value={localSettings.theme}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                theme: e.target.value as 'light' | 'dark' | 'auto',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={16} className="mr-2 text-gray-600" />
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Enable Notifications
                </label>
                <p className="text-sm text-gray-600">
                  Get notified when experiments complete or encounter errors
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={localSettings.notifications}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                notifications: e.target.checked,
              })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>

          {/* Auto Save */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Auto Save
              </label>
              <p className="text-sm text-gray-600">
                Automatically save experiment progress and settings
              </p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.autoSave}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                autoSave: e.target.checked,
              })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>

          {/* Max Concurrent Experiments */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Maximum Concurrent Experiments
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={localSettings.maxConcurrentExperiments}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                maxConcurrentExperiments: parseInt(e.target.value) || 1,
              })}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-1">
              Limit the number of experiments that can run simultaneously
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Help & Tutorial</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Getting Started</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Configure your API keys above to enable AI capabilities</li>
                <li>Go to the Home page and enter a research topic or question</li>
                <li>Monitor your experiments on the Experiments page</li>
                <li>View system resources on the Monitoring page</li>
              </ol>
            </div>
            
            <div className="text-sm text-gray-600">
              <h4 className="font-medium text-gray-900 mb-2">Supported Features:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Natural language research queries</li>
                <li>Real-time experiment monitoring</li>
                <li>Resource usage tracking</li>
                <li>Multiple concurrent experiments</li>
                <li>Citation and analysis tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};