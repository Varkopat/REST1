import { useState } from "react";

/**
 * Hakulomake-komponentti mahdollistaa sanojen hakemisen sanakirjasta.
 * Käyttäjä voi syöttää suomenkielisen sanan ja saada sen englanninkielisen käännöksen.
 */
function Hakulomake() {
  // Tilamuuttujat hakusanalle, käännökselle ja virheviestille
  const [searchWord, setSearchWord] = useState(""); // Hakusana
  const [translation, setTranslation] = useState(null); // Löydetty käännös
  const [error, setError] = useState(null); // Mahdollinen virheviesti

  /**
   * Käsittelee sanan haun.
   * Hakee käännöksen backend-palvelimelta ja päivittää käyttöliittymän tilan.
   */
  const handleSearch = async () => {
    // Tarkista, että hakusana on syötetty
    if (!searchWord.trim()) {
      setError("Syötä sana ensin!");
      return;
    }

    try {
      // Tee HTTP-pyyntö backend-palvelimelle
      const response = await fetch(`http://localhost:3000/words/${searchWord}`);
      const data = await response.json();

      // Käsittele vastaus
      if (response.ok) {
        setTranslation(data.eng); // Aseta löydetty käännös
        setError(null); // Nollaa mahdollinen aiempi virheviesti
      } else {
        setError(data.message || "Sanaa ei löytynyt"); // Näytä virheviesti
        setTranslation(null); // Nollaa mahdollinen aiempi käännös
      }
    } catch (err) {
      setError("Virhe haettaessa käännöstä: " + err.message);
      setTranslation(null);
    }
  };

  /**
   * Palauttaa hakulomakkeen käyttöliittymän.
   * Sisältää syötekentän, hakupainikkeen ja tulosalueen.
   */
  return (
    <div className="hakulomake">
      <h2>Hae käännöstä</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Syötä suomenkielinen sana"
        />
        <button onClick={handleSearch}>Hae käännös</button>
      </div>

      {error && <p className="error">{error}</p>}
      {translation && (
        <div className="result">
          <p>Käännös:</p>
          <p>
            <strong>{searchWord}</strong> = <strong>{translation}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Hakulomake;
