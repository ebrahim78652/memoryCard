import React, { useEffect, useState } from "react";

export function CardsArea(props) {
  return (
    <div className="cards_area">
      {props.imageInfos.map((imageInfo, index) => {
        <img key={imageInfo.id} src={imageInfo.url} alt={"pic" + index} />;
      })}
    </div>
  );
}
