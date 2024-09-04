import { useState } from "react";

export default function Characters(props) {
  const { characters, setCharacters } = props;

  const resetCharacters = () => {
    setCharacters(null);
  };

  const deleteCharacters = (id) => {
    const updatedCharacters = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(updatedCharacters);
  };

  return (
    <div className="characters">
      <h1>Pokemons</h1>
      <div className="container-characters">
        {characters.map((character, index) => (
          <div className="character-container" key={index}>
            <div>
              <h3>{character.name}</h3>
              <img src={character.sprites.front_default} alt={character.name} />
              <button onClick={() => deleteCharacters(character.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <span className="back-home" onClick={resetCharacters}>
        volver al home
      </span>
    </div>
  );
}
