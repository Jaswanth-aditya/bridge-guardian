import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  delay?: number;
  color?: string;
}

export const SensorCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  delay = 0,
  color = "primary"
}: SensorCardProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </h3>
            <div className={`p-2 rounded-lg bg-${color}/10`}>
              <Icon className={`w-5 h-5 text-${color}`} />
            </div>
          </div>
          
          <div className="flex items-baseline gap-2">
            <motion.span
              key={value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-foreground"
            >
              {value.toFixed(1)}
            </motion.span>
            <span className="text-lg text-muted-foreground">{unit}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
