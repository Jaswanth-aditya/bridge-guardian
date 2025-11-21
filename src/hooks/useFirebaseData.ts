import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/lib/firebase";
import { monitoringConfig } from "@/config/monitoring";

export interface SensorData {
  humidity: number;
  temperature: number;
  traffic: number;
}

export interface PredictionData {
  collapse_prediction: number;
}

export interface HistoricalData {
  timestamp: number;
  humidity: number;
  temperature: number;
  traffic: number;
}

export const useFirebaseData = () => {
  const [sensors, setSensors] = useState<SensorData>({
    humidity: 0,
    temperature: 0,
    traffic: 0,
  });
  const [prediction, setPrediction] = useState<number>(1);
  const [history, setHistory] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let lastFetch = Date.now();
    
    const sensorsRef = ref(database, "sensors");
    const predictionsRef = ref(database, "predictions");

    const handleSensorsUpdate = (snapshot: any) => {
      const now = Date.now();
      const latencyMs = monitoringConfig.latency * 1000;
      
      if (now - lastFetch >= latencyMs) {
        const data = snapshot.val();
        if (data) {
          const newSensorData = {
            humidity: data.humidity || 0,
            temperature: data.temperature || 0,
            traffic: data.traffic || 0,
          };
          
          setSensors(newSensorData);
          
          // Add to history
          setHistory((prev) => {
            const newHistory = [
              ...prev,
              {
                timestamp: now,
                ...newSensorData,
              },
            ].slice(-monitoringConfig.logs);
            return newHistory;
          });
          
          lastFetch = now;
        }
        setLoading(false);
      }
    };

    const handlePredictionsUpdate = (snapshot: any) => {
      const data = snapshot.val();
      if (data && data.collapse_prediction !== undefined) {
        setPrediction(data.collapse_prediction);
      }
    };

    onValue(sensorsRef, handleSensorsUpdate);
    onValue(predictionsRef, handlePredictionsUpdate);

    return () => {
      off(sensorsRef);
      off(predictionsRef);
    };
  }, []);

  return { sensors, prediction, history, loading };
};
