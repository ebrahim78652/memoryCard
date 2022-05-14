import React, { useEffect, useState } from "react";

export function useScore() {
  const [score, setScore] = useState(0);
  const [highScore, setHighscore] = useState(0);

  const incrementScore = () => {
    let newScore = score + 1;
    setScore(newScore);
    if (newScore > highScore) {
      setHighscore(newScore);
    }
  };

  return [score, setScore, highScore, setHighscore, incrementScore];
}
