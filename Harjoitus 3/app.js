class Henkilo {
  constructor(etunimi, sukunimi, kutsumanimi, syntymavuosi) {
    this.etunimi = etunimi;
    this.sukunimi = sukunimi;
    this.kutsumanimi = kutsumanimi;
    this.syntymavuosi = syntymavuosi;
  }

  describe() {
    return `${this.Nimi} kutsumanimi on ${this.Kutsumanimi}. Hän on syntynyt vuonna ${this.Syntymavuosi}. \n`;
  }

  get Nimi() {
    return this.etunimi + " " + this.sukunimi;
  }

  get Etunimi() {
    return this.etunimi;
  }

  set Etunimi(etunimi) {
    this.etunimi = etunimi;
  }

  get Sukunimi() {
    return this.sukunimi;
  }

  set Sukunimi(sukunimi) {
    this.sukunimi = sukunimi;
  }

  get Kutsumanimi() {
    return this.kutsumanimi;
  }

  set Kutsumanimi(kutsumanimi) {
    this.kutsumanimi = kutsumanimi;
  }

  get Syntymavuosi() {
    return this.syntymavuosi;
  }

  set Syntymavuosi(ika) {
    this.syntymavuosi = ika;
  }
}

class Urheilija extends Henkilo {
  constructor(
    etunimi,
    sukunimi,
    kutsumanimi,
    syntymavuosi,
    linkkiKuvaan,
    omaPaino,
    laji,
    saavutukset
  ) {
    super(etunimi, sukunimi, kutsumanimi, syntymavuosi);
    this.linkkiKuvaan = linkkiKuvaan;
    this.omaPaino = omaPaino;
    this.laji = laji;
    this.saavutukset = saavutukset;
  }

  describe() {
    return (
      `${this.Nimi} on syntynyt vuonna ${this.Syntymavuosi}. \n` +
      `${this.etunimi} painaa ${this.Paino} kiloa, ja kilpailee lajissa ${this.Laji}. \n` +
      `Hänen saavutuksiinsa kuuluu: ` +
      this.Saavutukset +
      ". \n"
    );
  }

  get Kuva() {
    return this.linkkiKuvaan;
  }
  set Kuva(kuva) {
    this.kuva = kuva;
  }

  get Paino() {
    return this.omaPaino;
  }
  set Paino(paino) {
    this.paino = paino;
  }

  get Laji() {
    return this.laji;
  }
  set Laji(laji) {
    this.laji = laji;
  }

  get Saavutukset() {
    return this.saavutukset.join(", ");
  }
  set Saavutukset(saavutukset) {
    this.saavutukset = saavutukset;
  }
}

const hlo1 = new Henkilo("Pekka", "Päämies", "Päle", 1930);

const hlo2 = new Urheilija(
  "Matti",
  "Mattila",
  "Make",
  1980,
  "https://ichef.bbci.co.uk/news/976/cpsprodpb/15231/production/_110677568_976_index_2ar5jtd.jpg.webp",
  160,
  "Sumo",
  ["Maailmanmestaruus", "Suomenmestaruus"]
);

console.log(hlo1.describe());
console.log(hlo2.describe());
