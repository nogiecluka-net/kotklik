// Zasady darmowych gier KotKlik — wspólne dla strony głównej i Strefy rodzica.
// Żeby zmienić, które gry są darmowe, edytuj tylko ten plik.
(function(){
  const NAZWY = {
    "pary-klika": "Pary Klika",
    "literkowa-spizarnia": "Literkowa spiżarnia",
    "powtorz-melodie": "Powtórz melodię",
    "kabelkowy-labirynt": "Kabelkowy labirynt",
    "muzyka-pana-klika": "Muzyka Pana Klika"
  };

  // Te gry są darmowe na stałe.
  const ZAWSZE_DARMOWE = ["pary-klika", "literkowa-spizarnia"];

  // Z tej listy co tydzień (od poniedziałku) wybierane są kolejne dwie gry.
  const ROTACJA = ["powtorz-melodie", "kabelkowy-labirynt", "muzyka-pana-klika"];
  const GIER_W_TYGODNIU = 2;

  // Poniedziałek, od którego liczymy tygodnie rotacji.
  const START = new Date(2026, 8, 21);
  const DZIEN = 24 * 60 * 60 * 1000;

  function gryTygodnia(dzis){
    dzis = dzis || new Date();
    const polnoc = new Date(dzis.getFullYear(), dzis.getMonth(), dzis.getDate());
    // Math.round, bo przy zmianie czasu doba ma 23 lub 25 godzin
    const dni = Math.round((polnoc - START) / DZIEN);
    const tydzien = Math.floor(dni / 7);
    const poniedzialek = new Date(START.getFullYear(), START.getMonth(), START.getDate() + tydzien * 7);
    const niedziela = new Date(poniedzialek.getFullYear(), poniedzialek.getMonth(), poniedzialek.getDate() + 6);

    const ile = Math.min(GIER_W_TYGODNIU, ROTACJA.length);
    const poczatek = ((tydzien * ile) % ROTACJA.length + ROTACJA.length) % ROTACJA.length;
    const gry = [];
    for (let i = 0; i < ile; i++) gry.push(ROTACJA[(poczatek + i) % ROTACJA.length]);

    return { gry: gry, doKiedy: niedziela };
  }

  function data(d){
    return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0");
  }

  window.KotKlikGry = {
    NAZWY: NAZWY,
    ZAWSZE_DARMOWE: ZAWSZE_DARMOWE,
    ROTACJA: ROTACJA,
    gryTygodnia: gryTygodnia,
    data: data
  };
})();
