import React, { useEffect, useState } from "react";
import { CardsArea } from "./CardsArea";
import { imageInfo } from "../modal/imageInfo";

export function Game(props) {
  //initialise the state;
  const [score, setScore] = useState(0);
  const [highScore, setHighscore] = useState(0);
  const [dataFromAPI, setDataFromAPI] = useState(null);
  const [currentPictures, setCurrentPictures] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [picturesClicked, setPicturesClicked] = useState([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [numPicsinCurrentRound, setNumPicsinCurrentRound] = useState(3);

  //below effect runs once after the Game Component has mounted.
  //after that it will not run
  useEffect(() => {
    console.log("use effect called!");
    const apiCall = async () => {
      const response = await fetch(
        "https://www.breakingbadapi.com/api/characters",
        {
          mode: "cors",
        }
      );
      const data = await response.json();
      const shuffled = data.sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 25);
      const arrImageInfos = [];
      selected.forEach((element) => {
        const image = imageInfo(element.char_id, element.name, element.img);
        arrImageInfos.push(image);
      });
      console.log(arrImageInfos);
      setDataFromAPI(arrImageInfos);
      setCurrentPictures(arrImageInfos.slice(0, 3));
    };
    apiCall();
  }, []);

  //checking if player has won
  useEffect(() => {
    console.log(numPicsinCurrentRound);
    if (score === numPicsinCurrentRound && numPicsinCurrentRound === 3) {
      setIsGameWon(true);
    }
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

    updateListClickedPictures(dataAttribute);
    shufflePictures();
  };

  const shufflePictures = () => {
    console.log("shuffle the pics called!");

    const logic = () => {
      do {
        let unshuffled = currentPictures;
        let shuffled = unshuffled
          .map((element) => ({ element, key: Math.random() }))
          .sort((a, b) => b.key - a.key)
          .map((element) => element.element);

        if (JSON.stringify(shuffled) !== JSON.stringify(currentPictures)) {
          return shuffled;
        }
      } while (true);
    };

    //change the number here when rounds are introduced

    let shuffledArray = logic();
    setCurrentPictures(shuffledArray);
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
    let newScore = score + 1;
    setScore(newScore);
    if (newScore > highScore) {
      setHighscore(newScore);
    }
  };

  const onRestart = () => {
    setScore(0);
    setHighscore(0);
    setIsGameOver(false);
    setIsGameWon(false);
    setPicturesClicked([]);
    updateCurrentPictures(3);
    setNumPicsinCurrentRound(3);
  };

  const updateCurrentPictures = (numOfPictures) => {
    const shuffled = dataFromAPI.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, numOfPictures);
    setCurrentPictures(selected);
  };

  return (
    <div className="game_container">
      <header>
        <h1>Memory Game</h1>
      </header>
      <div className="scoreContainer">
        <div className="score">Score: {score}</div>
        <div className="high_score">High Score: {highScore} </div>
      </div>
      {dataFromAPI ? (
        <CardsArea
          checkPlayerLostAndShuffleCards={checkPlayerLostAndShuffleCards}
          //imageInfos={[dataFromAPI[0], dataFromAPI[1], dataFromAPI[2]]}
          //change below line when rounfs are introduced
          imageInfos={currentPictures}
        />
      ) : null}

      {isGameOver ? (
        <div className="gameover_container">
          <div className="card_gameover">
            <div className="message">Game Over! 👎</div>
            <div onClick={onRestart} className="restart">
              Restart
            </div>
          </div>
        </div>
      ) : null}

      {isGameWon ? (
        <div className="gameover_container">
          <div className="card_gameWon">
            <div className="message">Game Won! 🔥</div>
            <div onClick={onRestart} className="restart">
              Restart
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
