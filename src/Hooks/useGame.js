import React, { useEffect, useState } from "react";
import { useScore } from "./useScore";
import { usePictures } from "./usePictures";

export function useGame() {
  const GAME_END = 12;
  const GAME_START = 3;
  const [
    roundScore,
    setRoundScore,
    highScore,
    setHighscore,
    incrementScore,
    overAllScore,
    setOverAllScore,
  ] = useScore();

  const [
    shufflePictures,
    picturesClicked,
    setPicturesClicked,
    currentPictures,
    updateCurrentPictures,
    numPicsinCurrentRound,
    setNumPicsinCurrentRound,
  ] = usePictures(GAME_START);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  //checking if player has won
  useEffect(() => {
    console.log(numPicsinCurrentRound);
    if (
      roundScore === numPicsinCurrentRound &&
      numPicsinCurrentRound === GAME_END
    ) {
      setIsGameWon(true);
    }

    //if round is won, then going to next round;
    if (roundScore === numPicsinCurrentRound) {
      console.log("start of new round!");
      const numPicturesInOldRound = numPicsinCurrentRound;
      const numPicsInNewRound = numPicturesInOldRound * 2;
      updateCurrentPictures(numPicsInNewRound);
      setNumPicsinCurrentRound(numPicsInNewRound);
      setRoundScore(0);
      setPicturesClicked([]);
    }
  }, [roundScore]);

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
    setRoundScore(0);
    setOverAllScore(0);
    setHighscore(0);
    setIsGameOver(false);
    setIsGameWon(false);
    setPicturesClicked([]);
    updateCurrentPictures(GAME_START);
    setNumPicsinCurrentRound(GAME_START);
  };

  return {
    overAllScore,
    highScore,
    checkPlayerLostAndShuffleCards,
    currentPictures,
    isGameOver,
    isGameWon,
    onRestart,
  };
}
