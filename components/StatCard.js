function StatCard({ icon, title, value, color }) {
  try {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
            <div className={`icon-${icon} text-xl`}></div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('StatCard component error:', error);
    return null;
  }
}