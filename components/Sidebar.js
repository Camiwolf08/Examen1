function Sidebar({ isOpen, onToggle }) {
  try {
    const [activeMenu, setActiveMenu] = React.useState('inicio');

    const menuItems = [
      { id: 'inicio', icon: 'home', label: 'Inicio', link: 'dashboard.html' },
      { id: 'usuarios', icon: 'users', label: 'Usuarios', link: 'users.html' },
      { id: 'configuracion', icon: 'settings', label: 'Configuración', link: 'settings.html' }
    ];

    return (
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map(item => (
              <a
                key={item.id}
                href={item.link}
                onClick={() => setActiveMenu(item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-[var(--secondary-color)] text-[var(--primary-color)]' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`icon-${item.icon} text-xl`}></div>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}