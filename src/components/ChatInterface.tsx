import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, ArrowUp, Brain, Zap } from 'lucide-react';
import { useStore } from '../stores/useStore';
import type { ChatMessage, Experiment } from '../types';

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, addMessage, addExperiment } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setMessage('');
    setIsProcessing(true);

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Simulate processing
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you start a research experiment on "${message}". Creating a new experiment with this topic and will begin analyzing relevant research, data sources, and methodologies.`,
        sender: 'assistant',
        timestamp: new Date(),
      };

      // Create a new experiment
      const experiment: Experiment = {
        id: Date.now().toString(),
        name: `Research: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`,
        topic: message,
        status: 'pending',
        progress: 0,
        startTime: new Date(),
        resourceUsage: {
          cpu: 0,
          memory: 0,
          network: 0,
          storage: 0,
        },
        agents: [],
      };

      addMessage(assistantMessage);
      addExperiment(experiment);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  const examplePrompts = [
    "Research the latest developments in quantum computing",
    "Analyze the impact of AI on healthcare outcomes",
    "Study renewable energy adoption patterns globally",
    "Investigate machine learning bias in hiring algorithms"
  ];

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex items-center justify-center min-h-full py-16">
              <div className="w-full max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-16">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-cyan-600/20 rounded-full blur-3xl opacity-60"></div>
                    <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 rounded-3xl shadow-2xl shadow-indigo-500/25 mx-auto">
                      <Brain size={40} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <h1 className="text-5xl font-bold bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent mb-6 tracking-tight">
                    AI Research Lab
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed text-balance">
                    Start intelligent conversations with our AI research team. We'll collaborate to investigate 
                    any topic and provide comprehensive, data-driven insights.
                  </p>
                </div>

                {/* Example Prompts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
                  {examplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(prompt)}
                      className="group relative p-6 text-left bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/60 rounded-3xl hover:border-indigo-300/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-start space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors duration-300 shadow-lg">
                          <Sparkles size={20} className="text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-700 font-semibold group-hover:text-slate-900 transition-colors duration-300 leading-relaxed">
                            {prompt}
                          </p>
                          <div className="flex items-center mt-3 text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>Click to start research</span>
                            <ArrowUp size={14} className="ml-1 rotate-45" />
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Features Section */}
                <div className="bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80 rounded-3xl p-8 border border-slate-200/50 backdrop-blur-sm shadow-xl shadow-slate-900/5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center group">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl shadow-lg shadow-emerald-500/25 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Zap size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Real-time Analysis</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Instant processing and analysis of research data with live updates
                      </p>
                    </div>
                    <div className="text-center group">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/25 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Brain size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">AI Collaboration</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Multiple AI agents working together to provide comprehensive insights
                      </p>
                    </div>
                    <div className="text-center group">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl shadow-lg shadow-violet-500/25 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Sparkles size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Insights</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Advanced pattern recognition and intelligent data interpretation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="py-12 space-y-8">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                >
                  <div className={`max-w-4xl flex ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-4`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${msg.sender === 'user' ? 'ml-4' : 'mr-4'}`}>
                      <div className={`relative w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-br from-slate-700 to-slate-900' 
                          : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500'
                      }`}>
                        {msg.sender === 'user' ? (
                          <span className="text-sm font-bold text-white">U</span>
                        ) : (
                          <Brain size={18} className="text-white" />
                        )}
                        {msg.sender === 'assistant' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`relative inline-block px-6 py-4 rounded-3xl shadow-lg ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-slate-900/25'
                          : 'bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/60 text-slate-900 shadow-slate-900/10'
                      }`}>
                        {msg.sender === 'assistant' && (
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
                        )}
                        <p className="text-base leading-relaxed whitespace-pre-wrap relative z-10">{msg.content}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 px-2">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Processing indicator */}
              {isProcessing && (
                <div className="flex justify-start animate-slide-in">
                  <div className="max-w-4xl flex flex-row space-x-4">
                    <div className="flex-shrink-0 mr-4">
                      <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <Brain size={18} className="text-white" />
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 to-cyan-500/50 rounded-2xl blur-lg animate-pulse"></div>
                      </div>
                    </div>
                    <div className="relative bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/60 rounded-3xl px-6 py-4 shadow-lg shadow-slate-900/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
                      <div className="flex items-center space-x-3 relative z-10">
                        <Loader2 size={18} className="animate-spin text-indigo-600" />
                        <span className="text-base text-slate-700 font-medium">Analyzing your research topic...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200/50 bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-end space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Start your research conversation..."
                    disabled={isProcessing}
                    rows={1}
                    className="w-full px-6 py-4 pr-16 text-base border-2 border-slate-200/60 rounded-3xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-300 bg-white/90 backdrop-blur-sm placeholder-slate-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10"
                    style={{ minHeight: '56px', maxHeight: '200px' }}
                  />
                  <div className="absolute right-3 bottom-3">
                    <button
                      type="submit"
                      disabled={!message.trim() || isProcessing}
                      className={`group relative p-3 rounded-2xl transition-all duration-300 shadow-lg ${
                        message.trim() && !isProcessing
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {message.trim() && !isProcessing && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      )}
                      <ArrowUp size={20} className="relative z-10" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-slate-500">
              <span className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-mono">Enter</kbd>
                <span>to send</span>
              </span>
              <span className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-mono">Shift + Enter</kbd>
                <span>for new line</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};