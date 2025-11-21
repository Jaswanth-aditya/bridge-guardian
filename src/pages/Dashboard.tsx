import { Droplets, Thermometer, Car } from "lucide-react";
import { SensorCard } from "@/components/SensorCard";
import { PredictionStatus } from "@/components/PredictionStatus";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { sensors, prediction, loading } = useFirebaseData();

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

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Real-time Monitoring Dashboard
        </h2>
        <p className="text-muted-foreground">
          Live sensor readings from bridge infrastructure
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SensorCard
          title="Temperature"
          value={sensors.temperature}
          unit="°C"
          icon={Thermometer}
          delay={0.1}
          color="warning"
        />
        <SensorCard
          title="Humidity"
          value={sensors.humidity}
          unit="%"
          icon={Droplets}
          delay={0.2}
          color="primary"
        />
        <SensorCard
          title="Traffic Load"
          value={sensors.traffic}
          unit="units"
          icon={Car}
          delay={0.3}
          color="accent"
        />
      </div>

      <PredictionStatus prediction={prediction} />
    </div>
  );
};

export default Dashboard;
