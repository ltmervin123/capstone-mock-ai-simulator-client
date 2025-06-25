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

export const getChartData = () => {
  const labels = [
    '1:00AM',
    '2:00AM',
    '3:00AM',
    '4:00AM',
    '5:00AM',
    '6:00AM',
    '7:00AM',
    '8:00AM',
    '9:00AM',
    '10:00AM',
  ];
  return {
    labels,
    datasets: [
      {
        label: 'Scores',
        data: [50, 19, 30, 40, 60, 10, 70, 80, 90, 100],
        borderColor: '#0A7E32',
        backgroundColor: '#0A7E32',
      },
    ],
  };
};
