const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

var fs = require("fs");
var dictionaryFileName = "dictionary.dat";

// Initialize dictionary file with some words
InitDictionary();

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});

// GET a translation
app.get("/dictionary/:finnishWord", (req, res) => {
  let englishWord = GetEnglishTranslation(req.params.finnishWord);
  res.json(englishWord ? englishWord : { message: "Not found" });
});

// ADD a translation
app.post("/newTranslation/", (req, res) => {
  let finnishWord = req.query.finnishWord;
  let englishWord = req.query.englishWord;
  AddOrChangeTranslation(finnishWord, englishWord);
  res.json("Added or changed translation for " + finnishWord);
});

function InitDictionary() {
  // Check file exists
  try {
    fs.readFileSync(dictionaryFileName);
  } catch (err) {
    fs.writeFileSync(
      dictionaryFileName,
      JSON.stringify(Object.fromEntries(new Map()))
    );
  }

  // Add initial values
  dictionary = new Map(
    Object.entries(JSON.parse(fs.readFileSync(dictionaryFileName)))
  );
  dictionary.set("auto", "car");
  dictionary.set("talo", "house");
  dictionary.set("ovi", "door");
  dictionary.set("lattia", "floor");
  fs.writeFileSync(
    dictionaryFileName,
    JSON.stringify(Object.fromEntries(dictionary))
  );
}

function GetEnglishTranslation(finnishWord) {
  dictionary = new Map(
    Object.entries(JSON.parse(fs.readFileSync(dictionaryFileName)))
  );
  return dictionary.get(finnishWord);
}

function AddOrChangeTranslation(finnishWord, englishWord) {
  dictionary = new Map(
    Object.entries(JSON.parse(fs.readFileSync(dictionaryFileName)))
  );
  dictionary.set(finnishWord, englishWord);
  fs.writeFileSync(
    dictionaryFileName,
    JSON.stringify(Object.fromEntries(dictionary))
  );
}
