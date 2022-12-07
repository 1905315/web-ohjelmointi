require("dotenv").config();
const maria = require("mariadb/callback");

let host = process.env.DB_HOSTNAME;
let user = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let dbName = process.env.DB_NAME;
if (process.env.TESTING == "local") {
  host = process.env.LOCAL_DB_HOSTNAME;
  user = process.env.LOCAL_DB_USERNAME;
  password = process.env.LOCAL_DB_PASSWORD;
  dbName = process.env.LOCAL_DB_NAME;
}

const sendQuery = (sql, onError, onSuccess) => {
  const con = maria.createConnection({
    host: host,
    user: user,
    password: password,
    database: dbName,
  });
  con.connect((err) => {
    if (err) {
      onError(err);
    } else {
      con.query(sql, (err, res) => {
        if (err) {
          onError(err);
        } else {
          onSuccess(res);
        }
        con.commit();
        con.end();
      });
    }
  });
};

const haeUrheilijat = (onError, onSuccess) => {
  sendQuery(`SELECT * FROM urheilijat`, onError, onSuccess);
};

const poistaUrheilija = (id, onError, onSuccess) => {
  sendQuery(
    `DELETE FROM urheilijat 
      WHERE ID = ${id}`,
    onError,
    onSuccess
  );
};

const lisaaUrheilija = (info, onError, onSuccess) => {
  sendQuery(
    `INSERT INTO urheilijat 
      (Etunimi, Sukunimi, Kutsumanimi, Syntymavuosi, Paino, Kuva, Laji, Saavutukset)
      VALUES
      ('${info.etunimi}','${info.sukunimi}',
      '${info.kutsumanimi}','${info.syntymavuosi}',
      '${info.paino}','${info.kuva}',
      '${info.laji}','${info.saavutukset}')`,
    onError,
    onSuccess
  );
};

const paivitaUrheilija = (id, info, onError, onSuccess) => {
  sendQuery(
    `UPDATE urheilijat SET
        Etunimi = '${info.etunimi}', Sukunimi = '${info.sukunimi}',
        Kutsumanimi = '${info.kutsumanimi}', Syntymavuosi = '${info.syntymavuosi}',
        Paino = '${info.paino}', Kuva = '${info.kuva}',
        Laji = '${info.laji}', Saavutukset = '${info.saavutukset}' 
        WHERE ID = ${id}`,
    onError,
    onSuccess
  );
};

const haeUrheilijaEtunimella = (name, onError, onSuccess) => {
  sendQuery(
    `SELECT * FROM Urheilijat WHERE Etunimi='${name}'`,
    onError,
    onSuccess
  );
};

const haeUrheilija = (id, onError, onSuccess) => {
  sendQuery(`SELECT * FROM Urheilijat WHERE ID='${id}'`, onError, onSuccess);
};

module.exports = {
  haeUrheilija,
  paivitaUrheilija,
  haeUrheilijat,
  lisaaUrheilija,
  poistaUrheilija,
  haeUrheilijaEtunimella,
};
