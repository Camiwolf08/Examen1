const ChartJS = window.Chart;

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

function DashboardApp() {
  try {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    React.useEffect(() => {
      const user = getCurrentUser();
      if (!user) {
        window.location.href = 'index.html';
      } else {
        setCurrentUser(user);
      }
    }, []);

    if (!currentUser) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        <Topbar user={currentUser} />
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon="users" title="Total Usuarios" value="1,234" color="blue" />
              <StatCard icon="chart-bar" title="Ventas" value="$45,678" color="green" />
              <StatCard icon="shopping-cart" title="Pedidos" value="892" color="purple" />
              <StatCard icon="trending-up" title="Crecimiento" value="+23.5%" color="orange" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Ventas Mensuales" type="bar" />
              <ChartCard title="Distribución de Productos" type="doughnut" />
              <ChartCard title="Tendencia Anual" type="line" />
              <ChartCard title="Categorías" type="pie" />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <DashboardApp />
  </ErrorBoundary>
);