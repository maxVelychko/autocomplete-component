import React, { useEffect, useState } from 'react';

import Autocomplete from '../Autocomplete';
import './App.css';

interface PokemonData {
  name: string;
}

const App = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const { results } = await response.json();
        const namesList = results.map((item: PokemonData) => item.name);
        setSuggestions(namesList);
      } catch(error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="app">
      <div className="pageBody">
        <Autocomplete
          title="Pokemons Search"
          placeholder="Search by name"
          suggestions={suggestions}
        />
      </div>
    </div>
  );
}

export default App;
