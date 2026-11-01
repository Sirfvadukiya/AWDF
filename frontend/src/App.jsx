import { AuthProvider, useAuth } from './AuthContext';
import AuthForm from './components/AuthForm';
import TaskManager from './TaskManager';

function AppContent() {
  const { isAuthenticated, checkingSession, sessionExpired } = useAuth();

  if (checkingSession) {
    return (
      <div className="app">
        <p className="status">Checking session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app">
        <h1>PR6 / PR7 — Task Manager</h1>
        <p className="subtitle">React (5173) + Express (5000) + MongoDB</p>
        <AuthForm
          initialMessage={sessionExpired ? 'Your session expired. Please log in again.' : null}
        />
      </div>
    );
  }

  return <TaskManager />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
