function Topbar({ user }) {
  try {
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);

    return (
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="icon-home text-xl text-[var(--primary-color)]"></div>
            <span className="text-lg font-semibold text-gray-900">Inicio</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="icon-bell text-xl text-gray-700"></div>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border p-4">
                  <h3 className="font-semibold mb-3">Notificaciones</h3>
                  <p className="text-sm text-gray-600">No hay notificaciones nuevas</p>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 hover:bg-gray-100 rounded-full p-1 pr-3 transition-colors"
              >
                <img src={user.avatar} alt={user.fullName} className="w-10 h-10 rounded-full" />
                <span className="font-medium text-gray-900">{user.fullName}</span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4">
                  <div className="text-center mb-4">
                    <img src={user.avatar} alt={user.fullName} className="w-16 h-16 rounded-full mx-auto mb-2" />
                    <h3 className="font-semibold">{user.fullName}</h3>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Topbar component error:', error);
    return null;
  }
}