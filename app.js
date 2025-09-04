let dictionary = [];
const express = require("express");
const fs = require("fs");
//const bodyParser = require("body-parser");
/* const app = express().use(bodyParser.json()); //vanha tapa - ei enää voimassa. 
kts. https://devdocs.io/express/ -> req.body*/
let app = express();

// Ota käyttöön JSON- ja urlencoded-datan käsittely
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/*
CORS (Cross-Origin Resource Sharing) -otsikot mahdollistavat pyyntöjen tekemisen eri osoitteista.
*/
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// GET all words
app.get("/words", (req, res) => {
  // Lue tiedoston sisältö
  const data = fs.readFileSync("./sanakirja.txt", {
    encoding: "utf8",
    flag: "r",
  });
  // Pilko tiedosto riveihin
  const splitLines = data.split(/\r?\n/);
  // Käy jokainen rivi läpi ja lisää sanapari dictionary-taulukkoon
  splitLines.forEach((line) => {
    const words = line.split(" "); //sanat taulukkoon words
    console.log(words);
    const word = {
      fin: words[0],
      eng: words[1],
    };
    dictionary.push(word);
    console.log(dictionary);
  });

  // Palauta kaikki sanat JSON-muodossa
  res.json(dictionary);
});

// POST a new word
app.post("/words", (req, res) => {
  const { fin, eng } = req.body;
  // Tarkista, että molemmat kentät on annettu
  if (!fin || !eng) {
    return res
      .status(400)
      .json({ message: "Both 'fin' and 'eng' are required." });
  }

  // Lisää uusi sana tiedostoon
  const newLine = `\n${fin} ${eng}`;
  fs.appendFile("./sanakirja.txt", newLine, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error adding the word to the file." });
    }
    // Lisää sana myös muistiin
    dictionary.push({ fin, eng });
    // Palauta lisätty sana
    res.status(201).json({ fin, eng });
  });
});

// GET English translation of Finnish word
app.get("/words/:fin", (req, res) => {
  const finWord = req.params.fin;
  // Lue tiedoston sisältö
  const data = fs.readFileSync("./sanakirja.txt", {
    encoding: "utf8",
    flag: "r",
  });
  // Pilko rivit
  const splitLines = data.split(/\r?\n/);
  let found = null;

  // Etsi oikea sana
  splitLines.forEach((line) => {
    const words = line.split(" ");
    if (words[0] === finWord) {
      found = { eng: words[1] };
    }
  });

  // Palauta käännös tai virheilmoitus
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ message: "Word not found" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
