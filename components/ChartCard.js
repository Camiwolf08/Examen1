function ChartCard({ title, type }) {
  try {
    const canvasRef = React.useRef(null);
    const chartRef = React.useRef(null);

    React.useEffect(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        const data = {
          bar: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
              label: 'Ventas',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'rgba(16, 185, 129, 0.5)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 2
            }]
          },
          line: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
              label: 'Tendencia',
              data: [5, 10, 8, 15, 12, 18],
              borderColor: 'rgba(16, 185, 129, 1)',
              tension: 0.4
            }]
          },
          doughnut: {
            labels: ['Producto A', 'Producto B', 'Producto C'],
            datasets: [{
              data: [30, 50, 20],
              backgroundColor: ['#10b981', '#34d399', '#6ee7b7']
            }]
          },
          pie: {
            labels: ['Categoría 1', 'Categoría 2', 'Categoría 3'],
            datasets: [{
              data: [40, 35, 25],
              backgroundColor: ['#10b981', '#059669', '#047857']
            }]
          }
        };

        chartRef.current = new ChartJS(ctx, {
          type: type,
          data: data[type],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }

      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, [type]);

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="h-64">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ChartCard component error:', error);
    return null;
  }
}