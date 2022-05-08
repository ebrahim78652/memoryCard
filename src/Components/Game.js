import React, { useEffect, useState } from "react";
import { CardsArea } from "./CardsArea";
import { imageInfo } from "../modal/imageInfo";

export function Game(props) {
  //initialise the state;
  const [score, setScore] = useState(0);
  const [highScore, setHighscore] = useState(0);
  const [dataFromAPI, setDataFromAPI] = useState(null);

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
      console.log(data);
      const shuffled = data.sort(() => 0.5 - Math.random());
      console.log(shuffled);
      let selected = shuffled.slice(0, 25);
      console.log(selected);
      const arrImageInfos = [];
      selected.forEach((element) => {
        const image = imageInfo(element.char_id, element.name, element.img);
        arrImageInfos.push(image);
      });
      console.log(arrImageInfos);
      setDataFromAPI((prev) => [...arrImageInfos]);
      console.log(dataFromAPI);
    };

    apiCall();
  }, []);

  return (
    <div className="game_container">
      <header>
        <h1>Memory Game</h1>
      </header>
      <div className="scoreContainer">
        <div className="score">Score: 5</div>
        <div className="high_score">High Score: </div>
      </div>
      {dataFromAPI ? (
        <CardsArea
          imageInfos={[dataFromAPI[0], dataFromAPI[1], dataFromAPI[2]]}
        />
      ) : null}
    </div>
  );
}
