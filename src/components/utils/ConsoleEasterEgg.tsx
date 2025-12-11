"use client";

import { useEffect } from "react";

export const ConsoleEasterEgg = () => {
  useEffect(() => {
    // Definicja funkcji wewnątrz efektu lub wywołanie importowanej
    const runEasterEgg = () => {
      console.log(
        "%c🏺 Tomb Raider Gaming Website",
        "color: #FFD700; font-size: 24px; font-weight: bold;"
      );
      console.log("%cWitaj, odkrywco!", "color: #00FFFF; font-size: 16px;");
      console.log(
        "%cJeśli szukasz sekretów w konsoli, gratulacje! 🎮",
        "color: #FF1493; font-size: 14px;"
      );
    };

    runEasterEgg();
  }, []); // Pusta tablica zależności zapewnia wykonanie tylko raz przy montowaniu

  return null; // Ten komponent nie renderuje żadnego HTML
};