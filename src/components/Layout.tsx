import React from 'react';
import { Menu, X, Home, Settings, Beaker, BarChart3, Sparkles } from 'lucide-react';
import { useStore } from '../stores/useStore';
import { clsx } from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', icon: Home, id: 'home' },
  { name: 'Experiments', icon: Beaker, id: 'experiments' },
  { name: 'Monitoring', icon: BarChart3, id: 'monitoring' },
  { name: 'Settings', icon: Settings, id: 'settings' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen, setSidebarOpen, currentPage, setCurrentPage } = useStore();

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-white/95 to-slate-50/95 backdrop-blur-2xl border-r border-slate-200/50 transform transition-all duration-300 ease-out shadow-2xl shadow-slate-900/10',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="relative bg-gradient-to-r from-slate-100 to-transparent p-[1px] border-b">
          <div className="px-8 py-8 bg-white rounded-tl-2xl rounded-tr-2xl">
            <div className="flex items-center justify-between">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 rounded-2xl shadow-lg shadow-indigo-500/25">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
                  AI Research Lab
                </h1>
                <p className="text-sm text-slate-500 font-medium">Intelligent Research Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-all duration-200 backdrop-blur-sm"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="px-6 py-8">
          <div className="space-y-3">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      setCurrentPage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={clsx(
                      'w-full flex items-center px-5 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 group relative overflow-hidden',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transform scale-105'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-white/80 hover:to-slate-50/80 hover:shadow-md hover:scale-105'
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                    )}
                    <Icon 
                      size={22} 
                      className={clsx(
                        'mr-4 transition-all duration-300 relative z-10',
                        isActive ? 'text-white drop-shadow-sm' : 'text-slate-500 group-hover:text-indigo-600'
                      )} 
                    />
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white/80 rounded-full relative z-10"></div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-5 border border-emerald-200/50 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">System Ready</p>
                <p className="text-xs text-emerald-600 font-medium">All AI agents operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top bar */}
        <div className="bg-white/40 backdrop-blur-2xl border-b border-slate-200/30 px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-all duration-200 shadow-sm backdrop-blur-sm"
              >
                <Menu size={22} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 capitalize tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text">
                  {navigation.find(nav => nav.id === currentPage)?.name || 'Home'}
                </h2>
                <p className="text-base text-slate-600 font-medium mt-1">
                  {currentPage === 'home' && 'Start intelligent research conversations'}
                  {currentPage === 'experiments' && 'Manage and monitor your research projects'}
                  {currentPage === 'monitoring' && 'Real-time system and resource analytics'}
                  {currentPage === 'settings' && 'Configure AI models and preferences'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-transparent to-slate-50/30">
          <div className="h-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};