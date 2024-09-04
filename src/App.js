import pokedex from "./img/pokedex.png";
import Characters from "./components/Characters";
import "./App.css";
import { useState } from "react";

function App() {
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState("");

  const reqApi = async () => {
    const api = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
    );
    const characterApi = await api.json();
    const newPokemon = characterApi.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });

    const results = await Promise.all(newPokemon);
    setCharacters(results);

    console.log(results);
  };

  const searchCharacters = (e) => {
    setSearch(e.target.value);
  };

  const filteredCharacters = characters?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Pokedex</h1>
        <input
          className="search"
          placeholder="buscar pokemon"
          value={search}
          onChange={searchCharacters}
        />
        {characters ? (
          <Characters
            characters={filteredCharacters}
            setCharacters={setCharacters}
          />
        ) : (
          <>
            <img src={pokedex} alt="rick & morty" className="img-home" />
            <button onClick={reqApi} className="btn-search">
              Buscar Pokemon
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
