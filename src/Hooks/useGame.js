import React, { useEffect, useState } from "react";
import { useScore } from "./useScore";
import { usePictures } from "./usePictures";

export function useGame() {
  const [score, setScore, highScore, setHighscore, incrementScore] = useScore();
  const [
    shufflePictures,
    picturesClicked,
    setPicturesClicked,
    dataFromAPI,
    currentPictures,
    updateCurrentPictures,
    numPicsinCurrentRound,
    setNumPicsinCurrentRound,
  ] = usePictures();
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  //checking if player has won
  useEffect(() => {
    console.log(numPicsinCurrentRound);
    if (score === numPicsinCurrentRound && numPicsinCurrentRound === 12) {
      setIsGameWon(true);
    }

    //if round is won, then going to next round;
    if (score === numPicsinCurrentRound) {
      console.log("start of new round!");
      const numPicturesInOldRound = numPicsinCurrentRound;
      const numPicsInNewRound = numPicturesInOldRound * 2;
      updateCurrentPictures(numPicsInNewRound);
      setNumPicsinCurrentRound(numPicsInNewRound);
      setScore(0);
      setPicturesClicked([]);
    }
  }, [score]);

  const checkPlayerLostAndShuffleCards = (event) => {
    const dataAttribute = event.target.attributes[0].value;

    if (isPlayerLost(dataAttribute)) {
      return false;
    }

    //if player not lost, shuffle the cards and update the list of clicked pictures
    updateListClickedPictures(dataAttribute);
    shufflePictures();
  };

  const isPlayerLost = (dataAttribute) => {
    console.log("is player lost called");
    if (picturesClicked.includes(dataAttribute)) {
      console.log("gameover");
      setIsGameOver(true);
      return true;
    }
    return false;
  };

  const updateListClickedPictures = (dataAttribute) => {
    setPicturesClicked([...picturesClicked, dataAttribute]);
    incrementScore();
  };

  //extract this method.

  const onRestart = () => {
    setScore(0);
    setHighscore(0);
    setIsGameOver(false);
    setIsGameWon(false);
    setPicturesClicked([]);
    updateCurrentPictures(3);
    setNumPicsinCurrentRound(3);
  };

  return {
    score,
    highScore,
    dataFromAPI,
    checkPlayerLostAndShuffleCards,
    currentPictures,
    isGameOver,
    isGameWon,
    onRestart,
  };
}
