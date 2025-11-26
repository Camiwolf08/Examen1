function Alert({ type, message, onClose }) {
  try {
    const colors = {
      error: 'bg-red-100 text-red-800 border-red-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    return (
      <div className={`${colors[type]} border rounded-lg p-4 mb-4 flex items-center justify-between`}>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <div className="icon-x text-xl"></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('Alert component error:', error);
    return null;
  }
}