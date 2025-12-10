import Sidebar from './components/Layout/Sidebar';
import WorkflowsPage from './pages/WorkflowsPage';

function App() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkflowsPage />
      </div>
    </div>
  );
}

export default App;
