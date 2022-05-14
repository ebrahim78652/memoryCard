import { CardsArea } from "./CardsArea";
import { useGame } from "../Hooks/useGame";
export function Game(props) {
  //initialise the state;

  const {
    overAllScore,
    highScore,
    dataFromAPI,
    checkPlayerLostAndShuffleCards,
    currentPictures,
    isGameOver,
    isGameWon,
    onRestart,
  } = useGame();

  return (
    <div className="game_container">
      <header>
        <h1>Memory Game</h1>
      </header>
      <div className="scoreContainer">
        <div className="score">Score: {overAllScore}</div>
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

//comment in the new branch
