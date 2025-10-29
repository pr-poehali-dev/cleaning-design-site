
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Checklist from "./pages/Checklist";
import InspectionChecklist from "./pages/InspectionChecklist";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MaidDashboard from "./pages/MaidDashboard";
import SeniorCleanerDashboard from "./pages/SeniorCleanerDashboard";
import SalaryHistory from "./pages/SalaryHistory";
import AdminSalaryStats from "./pages/AdminSalaryStats";
import NotFound from "./pages/NotFound";
import CursorSparkles from "./components/CursorSparkles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CursorSparkles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/inspection" element={<InspectionChecklist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/salary-stats" element={<AdminSalaryStats />} />
          <Route path="/maid" element={<MaidDashboard />} />
          <Route path="/senior-cleaner" element={<SeniorCleanerDashboard />} />
          <Route path="/salary" element={<SalaryHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;