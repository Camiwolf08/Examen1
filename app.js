class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo salió mal</h1>
            <p className="text-gray-600 mb-4">Por favor, recarga la página.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Recargar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [alert, setAlert] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setAlert(null);

      try {
        const user = await authenticateUser(username, password);
        if (user) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          window.location.href = 'dashboard.html';
        } else {
          setAlert({ type: 'error', message: 'Usuario o contraseña incorrectos' });
        }
      } catch (error) {
        setAlert({ type: 'error', message: 'Error al iniciar sesión' });
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" 
           style={{background: 'linear-gradient(135deg, #d1fae5 0%, #10b981 100%)'}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-shield-check text-3xl text-[var(--primary-color)]"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido</h1>
            <p className="text-white text-opacity-80">Inicia sesión en tu cuenta</p>
          </div>

          {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg glass-card text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg glass-card text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary">
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 text-center text-white text-sm text-opacity-80">
            <p>Usuarios de prueba:</p>
            <p className="text-xs mt-1">super1/super123 | admin1/admin123 | user1/user123</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);