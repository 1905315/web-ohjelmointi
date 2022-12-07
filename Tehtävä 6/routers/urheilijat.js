const db = require("../db.js");
const utils = require("../utils.js");
const router = require("express").Router();
require("dotenv").config();

router.get("/:id", (request, response) => {
  const id = request.params.id;
  if (!Number.isInteger(Number(id))) {
    utils.handleError(response, "ID ei ole numero!", 400);
    return;
  }

  db.haeUrheilija(
    id,
    (err) => {
      utils.handleError(response, err);
    },
    (places) => {
      if (places.length == 0) {
        utils.handleError(response, "Ei urheilijaa löydetty id:llä " + id);
      } else {
        const place = places[0];
        response.json(place);
      }
    }
  );
});

router.get("/", (request, response) => {
  db.haeUrheilijat(
    (err) => {
      utils.handleError(response, err);
    },
    (urheilijat) => {
      if (urheilijat.length == 0) {
        utils.handleError(response, "Ei urheilijoita!", 404);
      } else {
        response.json(urheilijat);
      }
    }
  );
});

router.post("/:id", (request, response) => {
  db.paivitaUrheilija(
    request.params.id,
    request.body,
    (err) => {
      utils.handleError(response, err);
    },
    (res) => {
      db.haeUrheilija(
        res.insertId,
        (err) => {
          utils.handleError(response, err);
        },
        (urheilijat) => {
          response.json(urheilijat[0]);
        }
      );
    }
  );
});

router.post("/", (request, response) => {
  db.lisaaUrheilija(
    request.body,
    (err) => {
      utils.handleError(response, err);
    },
    (res) => {
      db.haeUrheilija(
        res.insertId,
        (err) => {
          utils.handleError(response, err);
        },
        (urheilijat) => {
          response.json(urheilijat[0]);
        }
      );
    }
  );
});

router.delete("/:id", (request, response) => {
  let urheilijaId = request.params.id;
  if (!Number.isInteger(Number(urheilijaId))) {
    utils.handleError(response, "ID ei ole numero!", 400);
    return;
  }

  db.haeUrheilija(
    urheilijaId,
    (err) => {
      utils.handleError(response, err);
    },
    (urheilijat) => {
      if (urheilijat.length == 0) {
        utils.handleError(
          response,
          "Ei löydetty urheilijaa ID:llä " + urheilijaId
        );
      } else {
        // Poista urheilija
        db.poistaUrheilija(
          urheilijaId,
          (err) => {
            utils.handleError(response, err);
          },
          (res) => {
            response.json("Onnistuneesti poistettu urheilija!");
          }
        );
      }
    }
  );
});

module.exports = router;
