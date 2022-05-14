import React, { useEffect, useState } from "react";

export function useScore() {
  const [roundScore, setRoundScore] = useState(0);
  const [highScore, setHighscore] = useState(0);
  const [overAllScore, setOverAllScore] = useState(0);

  const incrementScore = () => {
    console.log("the overall score is: " + overAllScore);
    let newRoundScore = roundScore + 1;
    setRoundScore(newRoundScore);
    //addition:
    setOverAllScore((prevOverAllScore) => {
      return prevOverAllScore + 1;
    });
    if (overAllScore + 1 > highScore) {
      setHighscore(overAllScore + 1);
    }
  };

  return [
    roundScore,
    setRoundScore,
    highScore,
    setHighscore,
    incrementScore,
    overAllScore,
    setOverAllScore,
  ];
}
