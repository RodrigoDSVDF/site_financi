import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Função para detectar automaticamente a base do GitHub ou Localhost
const base = window.location.pathname.startsWith('/site_financi') 
  ? '/site_financi' 
  : '';

function RouterComponent() {
  return (
    <Router base={base}>
      <Switch>
        {/* Rota principal */}
        <Route path="/" component={Home} />
        
        {/* Rota de erro 404 */}
        <Route path="/404" component={NotFound} />
        
        {/* Caso a pessoa digite qualquer outra coisa, manda para Home ou NotFound */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen bg-background">
             <RouterComponent />
             <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
