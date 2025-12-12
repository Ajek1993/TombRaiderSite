"use client";

import { Suspense } from "react";
import { GameplayContent } from "./GameplayContent";

export default function GameplaysPage() {
  return (
    <Suspense fallback={<div className="loading">Ładowanie...</div>}>
      <GameplayContent />
    </Suspense>
  );
}
