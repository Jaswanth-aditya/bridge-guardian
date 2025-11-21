import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PredictionStatusProps {
  prediction: number;
  className?: string;
}

export const PredictionStatus = ({ prediction, className = "" }: PredictionStatusProps) => {
  const isSafe = prediction === 1;
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={className}
    >
      <Card 
        className={`p-8 border-2 transition-all duration-500 ${
          isSafe 
            ? "bg-gradient-to-br from-success/20 to-card border-success/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]" 
            : "bg-gradient-to-br from-destructive/20 to-card border-destructive/50 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse"
        }`}
      >
        <div className="flex items-center gap-4">
          {isSafe ? (
            <CheckCircle2 className="w-12 h-12 text-success" />
          ) : (
            <AlertTriangle className="w-12 h-12 text-destructive" />
          )}
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Bridge Status
            </h3>
            <motion.p
              key={prediction}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`text-2xl font-bold ${
                isSafe ? "text-success" : "text-destructive"
              }`}
            >
              {isSafe ? "STABLE - No Collapse Risk" : "WARNING - Collapse Predicted"}
            </motion.p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
