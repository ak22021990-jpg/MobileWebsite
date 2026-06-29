import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import Home from "@/pages/Home";
import PlansPage from "@/pages/PlansPage";
import ESIMPage from "@/pages/ESIMPage";
import HelpPage from "@/pages/HelpPage";
import ReferPage from "@/pages/ReferPage";
import ActivatePage from "@/pages/ActivatePage";
import QuickRechargePage from "@/pages/QuickRechargePage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/plans" component={PlansPage} />
      <Route path="/esim" component={ESIMPage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/refer" component={ReferPage} />
      <Route path="/activate" component={ActivatePage} />
      <Route path="/quick-recharge" component={QuickRechargePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="lyca-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
