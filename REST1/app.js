const express = require("express");
const app = express();
app.use(express.static(__dirname));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

var fs = require("fs");
var dictionaryFileName = "dictionary.dat";

// Initialize dictionary file with some words
InitDictionary();

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
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

// GET a translation
app.get("/dictionary/:finnishWord", (req, res) => {
  let englishWord = GetEnglishTranslation(req.params.finnishWord);
  res.json(englishWord ? englishWord : { message: "Not found" });
});

// ADD a translation
app.post("/newTranslation/", (req, res) => {
  let finnishWord = req.body.finnishWord;
  let englishWord = req.body.englishWord;
  console.log(finnishWord, englishWord);
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
