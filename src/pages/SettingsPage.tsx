import React, { useState } from 'react';
import { Save, Key, ExternalLink, Bell, Palette, Settings as SettingsIcon, Sparkles, Shield, Zap } from 'lucide-react';
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
      icon: Sparkles,
      color: 'from-green-400 to-green-500',
    },
    {
      name: 'Anthropic',
      key: 'anthropic', 
      description: 'Claude models for advanced reasoning',
      docsUrl: 'https://console.anthropic.com/',
      icon: Shield,
      color: 'from-orange-400 to-orange-500',
    },
    {
      name: 'Perplexity',
      key: 'perplexity',
      description: 'Real-time search and research capabilities',
      docsUrl: 'https://docs.perplexity.ai/',
      icon: Zap,
      color: 'from-blue-400 to-blue-500',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-600 mt-1">Configure your AI Research Lab preferences and API connections</p>
        </div>
        <button
          onClick={handleSave}
          className="btn btn-primary flex items-center space-x-2 px-6 py-3"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* API Configuration */}
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl">
                <Key size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">API Configuration</h2>
                <p className="text-sm text-slate-600">Connect your AI service providers</p>
              </div>
            </div>
            <button
              onClick={() => setShowApiKeys(!showApiKeys)}
              className="btn btn-secondary text-sm"
            >
              {showApiKeys ? 'Hide' : 'Show'} API Keys
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {apiProviders.map((provider) => {
            const ProviderIcon = provider.icon;
            return (
              <div key={provider.key} className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${provider.color} rounded-2xl shadow-lg`}>
                      <ProviderIcon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{provider.name}</h3>
                      <p className="text-sm text-slate-600">{provider.description}</p>
                    </div>
                  </div>
                  <a
                    href={provider.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group-hover:text-slate-700"
                  >
                    <span>Get API Key</span>
                    <ExternalLink size={14} />
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
                  className="input"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* General Settings */}
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl">
              <SettingsIcon size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">General Settings</h2>
              <p className="text-sm text-slate-600">Customize your experience</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Theme */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 text-base font-medium text-slate-900">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-xl">
                <Palette size={16} className="text-white" />
              </div>
              <span>Theme Preference</span>
            </label>
            <select
              value={localSettings.theme}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                theme: e.target.value as 'light' | 'dark' | 'auto',
              })}
              className="input max-w-xs"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-success-400 to-success-500 rounded-xl">
                <Bell size={16} className="text-white" />
              </div>
              <div>
                <label className="text-base font-medium text-slate-900">
                  Enable Notifications
                </label>
                <p className="text-sm text-slate-600">
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
              className="h-5 w-5 text-slate-900 focus:ring-slate-500 border-slate-300 rounded"
            />
          </div>

          {/* Auto Save */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl">
                <Save size={16} className="text-white" />
              </div>
              <div>
                <label className="text-base font-medium text-slate-900">
                  Auto Save
                </label>
                <p className="text-sm text-slate-600">
                  Automatically save experiment progress and settings
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={localSettings.autoSave}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                autoSave: e.target.checked,
              })}
              className="h-5 w-5 text-slate-900 focus:ring-slate-500 border-slate-300 rounded"
            />
          </div>

          {/* Max Concurrent Experiments */}
          <div className="space-y-3">
            <label className="text-base font-medium text-slate-900 block">
              Maximum Concurrent Experiments
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                max="10"
                value={localSettings.maxConcurrentExperiments}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  maxConcurrentExperiments: parseInt(e.target.value) || 1,
                })}
                className="input max-w-32"
              />
              <p className="text-sm text-slate-600">
                Limit the number of experiments that can run simultaneously
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Tutorial */}
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-500 rounded-2xl">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Help & Tutorial</h2>
              <p className="text-sm text-slate-600">Get started with AI Research Lab</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span>Getting Started</span>
              </h3>
              <ol className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Configure your API keys above to enable AI capabilities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Go to the Home page and enter a research topic or question</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Monitor your experiments on the Experiments page</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>View system resources on the Monitoring page</span>
                </li>
              </ol>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                  <Sparkles size={12} className="text-white" />
                </div>
                <span>Key Features</span>
              </h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Natural language research queries</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Real-time experiment monitoring</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Resource usage tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Multiple concurrent experiments</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Citation and analysis tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};