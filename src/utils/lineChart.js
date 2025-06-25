export const getOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 0,
    devicePixelRatio: 2,

    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#000',
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#000',
          padding: 5,
        },
        beginAtZero: true,
      },
    },
  };
};

export const getChartData = ({ data = [], labels = [], label = 'Score' }) => {
  return {
    labels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: '#0A7E32',
        backgroundColor: '#0A7E32',
      },
    ],
  };
};
