import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter"; // Adicionado Router aqui
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function RouterComponent() {
  return (
    /* IMPORTANTE: O 'base' deve ser exatamente o nome do seu repositório 
       entre barras, para o wouter entender que o site começa ali.
    */
    <Router base="/site_financi">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/404" component={NotFound} />
        {/* Rota de fallback para qualquer coisa que não seja as acima */}
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
          <Toaster />
          <RouterComponent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;