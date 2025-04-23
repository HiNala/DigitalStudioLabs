import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SplashCursor } from "@/components/ui/splash-cursor";
import NotFound from "@/pages/not-found";

// Pages
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import PortfolioPage from "@/pages/PortfolioPage";
import ProcessPage from "@/pages/ProcessPage";
import AboutPage from "@/pages/AboutPage";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/process" component={ProcessPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] overflow-x-hidden">
          {/* Splash cursor effect for the entire site */}
          <SplashCursor 
            SPLAT_RADIUS={0.4}
            TRANSPARENT={true}
            COLOR_UPDATE_SPEED={12}
            DENSITY_DISSIPATION={1.8}
            VELOCITY_DISSIPATION={1.2}
            SPLAT_FORCE={8000}
            CURL={20}
            BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          />
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
