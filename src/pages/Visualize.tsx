import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Activity } from "lucide-react";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { PredictionStatus } from "@/components/PredictionStatus";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import GaugeChart from "react-gauge-chart";

type SensorType = "temperature" | "humidity" | "traffic";
type ViewMode = "graph" | "speedometer";

const Visualize = () => {
  const { sensors, prediction, history, loading } = useFirebaseData();
  const [viewMode, setViewMode] = useState<ViewMode>("graph");
  const [selectedSensor, setSelectedSensor] = useState<SensorType>("temperature");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const getChartData = () => {
    return history.map((item, index) => ({
      index: index + 1,
      value: item[selectedSensor],
    }));
  };

  const getMaxValue = () => {
    if (history.length === 0) return 100;
    const values = history.map((item) => item[selectedSensor]);
    return Math.ceil(Math.max(...values) * 1.2);
  };

  const getSensorLabel = () => {
    const labels = {
      temperature: "Temperature (°C)",
      humidity: "Humidity (%)",
      traffic: "Traffic Load",
    };
    return labels[selectedSensor];
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Data Visualization
        </h2>
        <p className="text-muted-foreground">
          Historical trends and real-time gauges
        </p>
      </motion.div>

      {/* View Mode Toggle */}
      <Card className="p-4 mb-6 bg-card border-border">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "graph" ? "default" : "outline"}
            onClick={() => setViewMode("graph")}
            className="flex-1"
          >
            <LineChart className="w-4 h-4 mr-2" />
            Graph View
          </Button>
          <Button
            variant={viewMode === "speedometer" ? "default" : "outline"}
            onClick={() => setViewMode("speedometer")}
            className="flex-1"
          >
            <Activity className="w-4 h-4 mr-2" />
            Speedometer View
          </Button>
        </div>
      </Card>

      <AnimatePresence mode="wait">
        {viewMode === "graph" ? (
          <motion.div
            key="graph"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sensor Selection */}
            <Card className="p-4 mb-6 bg-card border-border">
              <div className="flex gap-2">
                <Button
                  variant={selectedSensor === "temperature" ? "default" : "outline"}
                  onClick={() => setSelectedSensor("temperature")}
                  className="flex-1"
                >
                  Temperature
                </Button>
                <Button
                  variant={selectedSensor === "humidity" ? "default" : "outline"}
                  onClick={() => setSelectedSensor("humidity")}
                  className="flex-1"
                >
                  Humidity
                </Button>
                <Button
                  variant={selectedSensor === "traffic" ? "default" : "outline"}
                  onClick={() => setSelectedSensor("traffic")}
                  className="flex-1"
                >
                  Traffic
                </Button>
              </div>
            </Card>

            <PredictionStatus prediction={prediction} className="mb-6" />

            {/* Chart */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {getSensorLabel()} - Historical Data
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="index"
                      stroke="hsl(var(--muted-foreground))"
                      label={{ value: "Data Point", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      domain={[0, getMaxValue()]}
                      label={{ value: getSensorLabel(), angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="speedometer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PredictionStatus prediction={prediction} className="mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Temperature Gauge */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                  Temperature
                </h3>
                <GaugeChart
                  id="temperature-gauge"
                  nrOfLevels={20}
                  colors={["#3b82f6", "#eab308", "#ef4444"]}
                  arcWidth={0.3}
                  percent={sensors.temperature / 50}
                  textColor="hsl(var(--foreground))"
                  formatTextValue={() => `${sensors.temperature.toFixed(1)}°C`}
                />
                <p className="text-center text-muted-foreground mt-2">
                  Range: 0 - 50°C
                </p>
              </Card>

              {/* Humidity Gauge */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                  Humidity
                </h3>
                <GaugeChart
                  id="humidity-gauge"
                  nrOfLevels={20}
                  colors={["#ef4444", "#eab308", "#3b82f6"]}
                  arcWidth={0.3}
                  percent={sensors.humidity / 100}
                  textColor="hsl(var(--foreground))"
                  formatTextValue={() => `${sensors.humidity.toFixed(1)}%`}
                />
                <p className="text-center text-muted-foreground mt-2">
                  Range: 0 - 100%
                </p>
              </Card>
            </div>

            {/* Traffic Display */}
            <Card className="p-8 bg-card border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                Traffic Load
              </h3>
              <motion.div
                key={sensors.traffic}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-bold text-primary text-center"
              >
                {sensors.traffic.toFixed(0)}
              </motion.div>
              <p className="text-center text-muted-foreground mt-4">
                Current vehicle count
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Visualize;
