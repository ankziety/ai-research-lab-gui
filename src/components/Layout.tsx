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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transform transition-all duration-300 ease-out shadow-xl',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl shadow-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">AI Research Lab</h1>
              <p className="text-xs text-slate-500 font-medium">Research Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={clsx(
                      'w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group',
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    )}
                  >
                    <Icon 
                      size={20} 
                      className={clsx(
                        'mr-3 transition-colors duration-200',
                        isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                      )} 
                    />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-lg flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">Ready to Research</p>
                <p className="text-xs text-slate-500">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-white/60 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 mr-4 transition-colors duration-200"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 capitalize tracking-tight">
                  {navigation.find(nav => nav.id === currentPage)?.name || 'Home'}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  {currentPage === 'home' && 'Start a new research experiment'}
                  {currentPage === 'experiments' && 'Manage your research projects'}
                  {currentPage === 'monitoring' && 'Monitor system resources'}
                  {currentPage === 'settings' && 'Configure your preferences'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};