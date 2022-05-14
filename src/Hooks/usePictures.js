import React, { useEffect, useState } from "react";
import { imageInfo } from "../modal/imageInfo";

export function usePictures(numOfPicturesInFirstRound) {
  const [dataFromAPI, setDataFromAPI] = useState(null);
  const [currentPictures, setCurrentPictures] = useState([]);
  const [picturesClicked, setPicturesClicked] = useState([]);
  const [numPicsinCurrentRound, setNumPicsinCurrentRound] = useState(
    numOfPicturesInFirstRound
  );

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
      setCurrentPictures(arrImageInfos.slice(0, numOfPicturesInFirstRound));
    };
    apiCall();
  }, []);

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

  const updateCurrentPictures = (numOfPictures) => {
    const shuffled = dataFromAPI.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, numOfPictures);
    setCurrentPictures(selected);
  };

  return [
    shufflePictures,
    picturesClicked,
    setPicturesClicked,
    dataFromAPI,
    currentPictures,
    updateCurrentPictures,
    numPicsinCurrentRound,
    setNumPicsinCurrentRound,
  ];
}
