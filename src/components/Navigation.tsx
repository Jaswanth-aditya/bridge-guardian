import { NavLink } from "@/components/NavLink";
import { Activity, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { monitoringConfig } from "@/config/monitoring";

export const Navigation = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-card border-b border-border px-6 py-4 shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Bridge Monitor</h1>
            <p className="text-xs text-muted-foreground">Real-time structural analysis</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <NavLink
            to="/"
            end
            className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            activeClassName="bg-primary text-primary-foreground shadow-lg"
          >
            <Activity className="w-4 h-4" />
            Dashboard
          </NavLink>
          {monitoringConfig.visualisepage && (
            <NavLink
              to="/visualize"
              className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:bg-secondary"
              activeClassName="bg-primary text-primary-foreground shadow-lg"
            >
              <BarChart3 className="w-4 h-4" />
              Visualize
            </NavLink>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
