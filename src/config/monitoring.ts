// Configuration for bridge monitoring system
export const monitoringConfig = {
  // Latency in seconds - controls how often data is fetched from Firebase
  // 0.0 = fetch immediately when data changes
  // 1.0 = fetch every 1 second
  // 5.0 = fetch every 5 seconds
  latency: 1.0,
  
  // Number of historical data points to keep for charts
  // Used in the Visualize page for graph rendering
  logs: 20,
};

