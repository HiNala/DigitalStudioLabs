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
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import PortfolioPage from "@/pages/PortfolioPage";
import ProcessPage from "@/pages/ProcessPage";
import AboutPage from "@/pages/AboutPage";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";

// Coming Soon Pages
import PrivacyComingSoonPage from "@/pages/PrivacyComingSoonPage";
import TermsComingSoonPage from "@/pages/TermsComingSoonPage";
import SitemapComingSoonPage from "@/pages/SitemapComingSoonPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/alt" component={AltHomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/:slug" component={ServiceDetailPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/process" component={ProcessPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      
      {/* Coming Soon Pages */}
      <Route path="/privacy" component={PrivacyComingSoonPage} />
      <Route path="/terms" component={TermsComingSoonPage} />
      <Route path="/sitemap" component={SitemapComingSoonPage} />
      
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
            {/* Add global cursor spotlight */}
            <CursorSpotlight />
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
