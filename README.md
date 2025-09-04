# REST1

## Tehtävän kuvaus

Luo REST API sanakirjaa varten.

Sanakirjassa (tieto tiedostossa - esim. sanakirja.txt) on taulukossa eri riveillä sana suomeksi ja englanniksi;

esim.

auto car
talo house

Tarvitset API:a varten luoda hakua varten metodin (toteuta GET metodi) sekä sanojen lisäystä varten metodin (toteuta POST metodi).

Tiedonhaussa parametrina on suomenkielinen sana. Haku palauttaa englannin kielisen sanan vastineen.

Tiedonlisäyksessä tallennetaan suomenkielinen sana ja vastaava englanninkielinen sana uudelle riville (tekstitiedostoa kasvatetaan uudella rivillä)

Tiedoston käsittelyä varten tarvitset fs moduulin ( require("fs")).

Em. moduulista löytyy esim. metodi writeFileSync kirjoitusta varten ja readFileSync lukemista varten.

(Tiedoston käsittely voi olla synkroninen tai asynkroninen - saa valita).
