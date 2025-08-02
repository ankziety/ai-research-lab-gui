export interface Experiment {
  id: string;
  name: string;
  topic: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  endTime?: Date;
  resourceUsage: ResourceUsage;
  agents: Agent[];
  results?: ExperimentResult[];
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'idle' | 'working' | 'error' | 'offline';
  currentTask?: string;
  performance: {
    cpuUsage: number;
    memoryUsage: number;
    tasksCompleted: number;
  };
}

export interface ResourceUsage {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
}

export interface ExperimentResult {
  id: string;
  type: 'text' | 'chart' | 'data' | 'citation';
  content: any;
  timestamp: Date;
  source?: string;
}

export interface APIConfig {
  [key: string]: string | undefined;
  openai?: string;
  anthropic?: string;
  perplexity?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  autoSave: boolean;
  maxConcurrentExperiments: number;
  apiConfig: APIConfig;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  experimentId?: string;
}