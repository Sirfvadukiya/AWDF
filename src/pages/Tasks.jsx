import { AuthProvider, useAuth } from '../AuthContext';
import AuthForm from '../components/AuthForm';
import TaskManager from '../TaskManager';

function TasksContent() {
  const { isAuthenticated, checkingSession, sessionExpired } = useAuth();

  if (checkingSession) {
    return (
      <div style={{ padding: '20px' }}>
        <p className="status">Checking session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '640px', margin: '20px auto', padding: '0 20px' }}>
        <h2>Task Manager</h2>
        <p style={{ color: '#6b7280' }}>Manage tasks with full CRUD and authentication</p>
        <AuthForm
          initialMessage={sessionExpired ? 'Your session expired. Please log in again.' : null}
        />
      </div>
    );
  }

  return <TaskManager />;
}

export default function Tasks() {
  return (
    <AuthProvider>
      <TasksContent />
    </AuthProvider>
  );
}
