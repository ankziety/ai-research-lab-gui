# AI Research Lab GUI

A modern, intuitive GUI for the @ankziety/ai-research-lab-framework that enables users to easily run experiments locally using a desktop app or web interface. The application allows people to request research topics for the decentralized network with a clean, self-explanatory interface inspired by ChatGPT and Apple design principles.

## Features

### 🏠 Home - Chat Interface
- ChatGPT-inspired interface for natural language research queries
- Real-time experiment creation from conversations
- Message history with timestamps
- Processing indicators and feedback

### 🧪 Experiment Management
- Comprehensive dashboard for all experiments
- Real-time progress tracking with visual indicators
- Status management (pending, running, completed, failed)
- Action controls (start, pause, view, delete)
- Resource usage monitoring per experiment

### 📊 System Monitoring
- Real-time resource usage display (CPU, Memory, Network, Storage)
- Visual progress bars and color-coded indicators
- Active experiments overview with detailed metrics
- Performance tracking across multiple experiments

### ⚙️ Settings & Configuration
- API key management for OpenAI, Anthropic, and Perplexity
- Direct links to API provider documentation
- Theme selection (Light/Dark/Auto)
- Notification and auto-save preferences
- Tutorial and help documentation
- Configurable experiment limits

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with Apple-inspired design
- **State Management**: Zustand
- **Desktop**: Electron wrapper
- **Icons**: Lucide React
- **Build Tool**: Vite with hot module replacement

## Quick Start

### Web Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser** and navigate to `http://localhost:5173`

### Desktop Application

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Run desktop app in development**:
   ```bash
   npm run electron-dev
   ```

3. **Build for production**:
   ```bash
   npm run dist
   ```

## Production Builds

### Web Application
```bash
npm run build
npm run preview
```

### Desktop Applications

**All platforms**:
```bash
npm run dist
```

**macOS**:
```bash
npm run dist-mac
```

**Windows**:
```bash
npm run dist-win
```

**Linux**:
```bash
npm run dist-linux
```

## Getting Started

1. **Configure API Keys**: Go to Settings and add your API keys for AI providers
2. **Start Research**: Enter a research topic on the Home page
3. **Monitor Progress**: View experiments and system resources in real-time
4. **Manage Experiments**: Start, pause, or delete experiments as needed

## API Providers

The application supports integration with:

- **OpenAI**: GPT models for natural language processing
- **Anthropic**: Claude models for advanced reasoning
- **Perplexity**: Real-time search and research capabilities

## Development

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Main application pages
├── stores/        # Zustand state management
├── types/         # TypeScript type definitions
└── utils/         # Utility functions

electron/
└── main.js        # Electron main process
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run electron` - Run Electron app (requires built files)
- `npm run electron-dev` - Run Electron in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
