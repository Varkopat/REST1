import { useState } from "react";

/**
 * Lisayslomake-komponentti mahdollistaa uusien sanojen lisäämisen sanakirjaan.
 * Käyttäjä voi syöttää suomen- ja englanninkielisen sanan ja tallentaa ne palvelimelle.
 */
function Lisayslomake() {
  // Tilamuuttujat lomakkeen datalle ja viesteille
  const [formData, setFormData] = useState({
    fin: "", // Suomenkielinen sana
    eng: "", // Englanninkielinen sana
  });
  const [message, setMessage] = useState(null); // Onnistumisviesti
  const [error, setError] = useState(null); // Virheviesti

  /**
   * Käsittelee lomakkeen kenttien muutokset.
   * Päivittää formData-tilaa kun käyttäjä kirjoittaa kenttiin.
   * @param {Event} e - Muutostapahtuma
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Käsittelee lomakkeen lähetyksen.
   * Validoi syötteet ja lähettää uuden sanan palvelimelle.
   * @param {Event} e - Lähetystapahtuma
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Estä lomakkeen oletuslähetys

    // Tarkista, että molemmat kentät on täytetty
    if (!formData.fin.trim() || !formData.eng.trim()) {
      setError("Täytä molemmat kentät!");
      return;
    }

    try {
      // Lähetä uusi sana palvelimelle POST-pyynnöllä
      const response = await fetch("http://localhost:3000/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Käsittele vastaus
      if (response.ok) {
        setMessage("Sana lisätty onnistuneesti!"); // Näytä onnistumisviesti
        setError(null); // Nollaa mahdollinen aiempi virheviesti
        // Tyhjennä lomake uutta sanaa varten
        setFormData({ fin: "", eng: "" });
      } else {
        setError(data.message || "Virhe sanan lisäämisessä"); // Näytä virheviesti
        setMessage(null); // Nollaa mahdollinen aiempi onnistumisviesti
      }
    } catch (err) {
      setError("Virhe yhdistettäessä palvelimeen: " + err.message);
      setMessage(null);
    }
  };

  /** Palauttaa lisäyslomakkeen käyttöliittymän.
   * Sisältää syötekentät suomen- ja englanninkielisille sanoille sekä lähetyspainikkeen.
   * Näyttää myös mahdolliset virhe- ja onnistumisviestit.
   */
  return (
    <div className="lisayslomake">
      <h2>Lisää uusi sana</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fin">Suomeksi:</label>
          <input
            type="text"
            id="fin"
            name="fin"
            value={formData.fin}
            onChange={handleInputChange}
            placeholder="Syötä suomenkielinen sana"
          />
        </div>

        <div className="form-group">
          <label htmlFor="eng">Englanniksi:</label>
          <input
            type="text"
            id="eng"
            name="eng"
            value={formData.eng}
            onChange={handleInputChange}
            placeholder="Syötä englanninkielinen sana"
          />
        </div>

        <button type="submit">Lisää sana</button>
      </form>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default Lisayslomake;
