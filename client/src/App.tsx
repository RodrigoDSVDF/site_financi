import { Router, Route, Switch } from "wouter";
// Importe seus componentes aqui (exemplo abaixo)
// import Home from "./pages/Home";

function App() {
  return (
    /* CORREÇÃO: Adicionado o Router com base no nome do repositório */
    <Router base="/site_financi">
      <Switch>
        {/* Exemplo de rota - ajuste conforme seus componentes reais */}
        <Route path="/" component={() => <div>Página Inicial Carregada!</div>} />
        <Route path="/ebook" component={() => <div>Página do Ebook</div>} />
        
        {/* Rota padrão para 404 dentro do app */}
        <Route>404 - Página não encontrada</Route>
      </Switch>
    </Router>
  );
}

export default App;
