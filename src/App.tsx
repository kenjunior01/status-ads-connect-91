import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { CreatorDashboard } from "./pages/CreatorDashboard";
import { AdvertiserDashboard } from "./pages/AdvertiserDashboard";

const queryClient = new QueryClient();

function App() {
  const [currentPage, setCurrentPage] = useState("index");

  const renderPage = () => {
    switch (currentPage) {
      case "index":
        return <Index />;
      case "auth":
        return <Auth />;
      case "creator-dashboard":
        return <CreatorDashboard />;
      case "advertiser-dashboard":
        return <AdvertiserDashboard />;
      case "creators":
        return <Index />; // Placeholder - will show creators section
      default:
        return <Index />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />
          {renderPage()}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
