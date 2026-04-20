import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MarketProvider } from "./contexts/MarketContext";
import { WalletProvider } from "./contexts/WalletContext";
import Index from "./pages/Index";
import Forge from "./pages/Forge";
import Library from "./pages/Library";
import Governance from "./pages/Governance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MarketProvider>
        <WalletProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/forge" element={<Forge />} />
                <Route path="/library" element={<Library />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WalletProvider>
      </MarketProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
