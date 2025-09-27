import { useState } from "react";
import Hakulomake from "./components/Hakulomake";
import Lisayslomake from "./components/Lisayslomake";
import "./App.css";

function App() {
  const [sivu, setSivu] = useState("Aloitussivu ");

  const meneSivulle = (sivu) => (event) => {
    event.preventDefault();
    setSivu(sivu);
  };

  const sisalto = () => {
    if (sivu === "Aloitussivu") {
      return <App />;
    } else if (sivu === "Hakulomake") {
      return <Hakulomake />;
    } else if (sivu === "Lisayslomake") {
      return <Lisayslomake />;
    }
  };
  const padding = {
    padding: 5,
  };

  return (
    <>
      <h1>Sanakirja -sovellus</h1>

      <a href="" onClick={meneSivulle("Hakulomake")} style={padding}>
        Hakulomake
      </a>
      <a href="" onClick={meneSivulle("Lisayslomake")} style={padding}>
        Lisayslomake
      </a>

      {sisalto()}
    </>
  );
}

export default App;
