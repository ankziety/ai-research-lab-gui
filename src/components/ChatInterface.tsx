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
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] py-12">
              <div className="text-center space-y-8 animate-fade-in">
                {/* Logo and Welcome */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl shadow-xl mx-auto">
                    <Brain size={32} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                      Welcome to AI Research Lab
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto text-balance">
                      Start a conversation to begin your research. Our AI agents will collaborate 
                      to investigate your topic and provide comprehensive insights.
                    </p>
                  </div>
                </div>

                {/* Example Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                  {examplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(prompt)}
                      className="p-4 text-left bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-xl group-hover:bg-slate-200 transition-colors">
                          <Sparkles size={16} className="text-slate-600" />
                        </div>
                        <p className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                          {prompt}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Features */}
                <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Zap size={16} />
                    <span>Real-time Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain size={16} />
                    <span>AI Collaboration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles size={16} />
                    <span>Smart Insights</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="py-8 space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                >
                  <div className={`max-w-3xl flex ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${msg.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ${
                        msg.sender === 'user' 
                          ? 'bg-slate-900' 
                          : 'bg-gradient-to-br from-accent-400 to-accent-500'
                      }`}>
                        {msg.sender === 'user' ? (
                          <span className="text-xs font-semibold text-white">U</span>
                        ) : (
                          <Brain size={16} className="text-white" />
                        )}
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div className={`flex-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block px-4 py-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-900'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Processing indicator */}
              {isProcessing && (
                <div className="flex justify-start animate-slide-in">
                  <div className="max-w-3xl flex flex-row space-x-3">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
                        <Brain size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <Loader2 size={16} className="animate-spin text-slate-500" />
                        <span className="text-sm text-slate-600">Analyzing your research topic...</span>
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
      <div className="border-t border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI Research Lab..."
                  disabled={isProcessing}
                  rows={1}
                  className="w-full px-4 py-3 pr-12 text-base border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white placeholder-slate-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ minHeight: '48px', maxHeight: '200px' }}
                />
                <div className="absolute right-3 bottom-3">
                  <button
                    type="submit"
                    disabled={!message.trim() || isProcessing}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      message.trim() && !isProcessing
                        ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <ArrowUp size={18} />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};