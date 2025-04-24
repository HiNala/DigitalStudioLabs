import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Pages
import HomePage from "@/pages/HomePage";
import AltHomePage from "@/pages/AltHomePage";
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
      <Route path="/alt" component={AltHomePage} />
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
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
            {/* Add global cursor spotlight with layered effect */}
            <CursorSpotlight 
              size={450} 
              color="rgba(0, 160, 176, 0.15)" 
              opacity={0.65}
              blurSize={120}
            />
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
