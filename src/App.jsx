import { useState } from "react";
import Search from "./components/Search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Encontre <span className="text-gradient">Filmes</span> Que Você Vai Gostar Sem Complicações</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


      </div>

      
    </main>
  );
};

export default App;
