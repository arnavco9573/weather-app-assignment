export const getWeatherBackground = (weatherMain: string) => {
  switch(weatherMain) {
    case 'Clear':
      return 'bg-gradient-to-br from-blue-400 to-yellow-200';
    case 'Rain':
      return 'bg-gradient-to-br from-gray-400 to-blue-600';
    case 'Clouds':
      return 'bg-gradient-to-br from-gray-300 to-gray-500';
    case 'Snow':
      return 'bg-gradient-to-br from-white to-blue-200';
    default:
      return 'bg-gradient-to-br from-gray-100 to-gray-300';
  }
};