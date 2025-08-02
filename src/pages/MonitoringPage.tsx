import React from 'react';
import { Cpu, HardDrive, Network, MemoryStick, Activity } from 'lucide-react';
import { useStore } from '../stores/useStore';

export const MonitoringPage: React.FC = () => {
  const { experiments } = useStore();
  
  const runningExperiments = experiments.filter(exp => exp.status === 'running');
  
  const totalResourceUsage = runningExperiments.reduce(
    (acc, exp) => ({
      cpu: acc.cpu + (exp.resourceUsage?.cpu || 0),
      memory: acc.memory + (exp.resourceUsage?.memory || 0),
      network: acc.network + (exp.resourceUsage?.network || 0),
      storage: acc.storage + (exp.resourceUsage?.storage || 0),
    }),
    { cpu: 0, memory: 0, network: 0, storage: 0 }
  );

  const avgResourceUsage = {
    cpu: runningExperiments.length > 0 ? totalResourceUsage.cpu / runningExperiments.length : 0,
    memory: runningExperiments.length > 0 ? totalResourceUsage.memory / runningExperiments.length : 0,
    network: runningExperiments.length > 0 ? totalResourceUsage.network / runningExperiments.length : 0,
    storage: runningExperiments.length > 0 ? totalResourceUsage.storage / runningExperiments.length : 0,
  };

  const ResourceCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color 
  }: { 
    title: string; 
    value: number; 
    icon: React.ComponentType<any>; 
    color: string; 
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-md ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {Math.round(value)}%
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${Math.min(value, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
        <div className="text-sm text-gray-600">
          {runningExperiments.length} active experiments
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResourceCard
          title="CPU Usage"
          value={avgResourceUsage.cpu}
          icon={Cpu}
          color="bg-blue-500"
        />
        <ResourceCard
          title="Memory Usage"
          value={avgResourceUsage.memory}
          icon={MemoryStick}
          color="bg-green-500"
        />
        <ResourceCard
          title="Network I/O"
          value={avgResourceUsage.network}
          icon={Network}
          color="bg-yellow-500"
        />
        <ResourceCard
          title="Storage Usage"
          value={avgResourceUsage.storage}
          icon={HardDrive}
          color="bg-purple-500"
        />
      </div>

      {/* Active Experiments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Active Experiments</h2>
        </div>
        
        {runningExperiments.length === 0 ? (
          <div className="text-center py-12">
            <Activity size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No active experiments
            </h3>
            <p className="text-gray-600">
              Start an experiment to see real-time monitoring data.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="space-y-4">
              {runningExperiments.map((experiment) => (
                <div
                  key={experiment.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{experiment.name}</h3>
                    <span className="text-sm text-gray-500">
                      {Math.round(experiment.progress)}% complete
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">CPU:</span>
                      <span className="ml-2 font-medium">
                        {Math.round(experiment.resourceUsage?.cpu || 0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Memory:</span>
                      <span className="ml-2 font-medium">
                        {Math.round(experiment.resourceUsage?.memory || 0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Network:</span>
                      <span className="ml-2 font-medium">
                        {Math.round(experiment.resourceUsage?.network || 0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Storage:</span>
                      <span className="ml-2 font-medium">
                        {Math.round(experiment.resourceUsage?.storage || 0)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${experiment.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};