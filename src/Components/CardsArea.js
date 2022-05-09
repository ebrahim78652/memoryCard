import React, { useEffect, useState } from "react";

export function CardsArea(props) {
  return (
    <div className="cards_area">
      {props.imageInfos.map((element) => (
        <div key={element.id} className="imageDiv">
          <img
            data={element.id}
            onClick={props.checkPlayerLostAndShuffleCards}
            src={element.url}
            alt=""
          />
          {element.name}
        </div>
      ))}
    </div>
  );
}
