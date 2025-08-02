import React from 'react';
import { Play, Pause, Trash2, Eye } from 'lucide-react';
import { useStore } from '../stores/useStore';
import { clsx } from 'clsx';

export const ExperimentsPage: React.FC = () => {
  const { experiments, updateExperiment, deleteExperiment, setActiveExperiment } = useStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartExperiment = (id: string) => {
    updateExperiment(id, { status: 'running' });
    // Simulate progress
    const progressInterval = setInterval(() => {
      const experiment = experiments.find(exp => exp.id === id);
      if (experiment && experiment.progress < 100) {
        updateExperiment(id, { 
          progress: Math.min(experiment.progress + Math.random() * 10, 100),
          resourceUsage: {
            cpu: Math.random() * 80,
            memory: Math.random() * 60,
            network: Math.random() * 40,
            storage: Math.random() * 30,
          }
        });
      } else {
        updateExperiment(id, { status: 'completed', endTime: new Date() });
        clearInterval(progressInterval);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Experiments</h1>
        <div className="text-sm text-gray-600">
          {experiments.length} total experiments
        </div>
      </div>

      {experiments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Eye size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No experiments yet
          </h3>
          <p className="text-gray-600">
            Start a conversation on the Home page to create your first experiment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment) => (
            <div
              key={experiment.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {experiment.name}
                  </h3>
                  <span
                    className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(experiment.status)
                    )}
                  >
                    {experiment.status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {experiment.topic}
              </p>

              {experiment.status === 'running' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(experiment.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${experiment.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Started {experiment.startTime.toLocaleDateString()}
                </div>
                
                <div className="flex space-x-2">
                  {experiment.status === 'pending' && (
                    <button
                      onClick={() => handleStartExperiment(experiment.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Start experiment"
                    >
                      <Play size={16} />
                    </button>
                  )}
                  
                  {experiment.status === 'running' && (
                    <button
                      onClick={() => updateExperiment(experiment.id, { status: 'pending' })}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                      title="Pause experiment"
                    >
                      <Pause size={16} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => setActiveExperiment(experiment.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>
                  
                  <button
                    onClick={() => deleteExperiment(experiment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete experiment"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};