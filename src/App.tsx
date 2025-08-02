import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ExperimentsPage } from './pages/ExperimentsPage';
import { MonitoringPage } from './pages/MonitoringPage';
import { SettingsPage } from './pages/SettingsPage';
import { useStore } from './stores/useStore';

function App() {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'experiments':
        return <ExperimentsPage />;
      case 'monitoring':
        return <MonitoringPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;
