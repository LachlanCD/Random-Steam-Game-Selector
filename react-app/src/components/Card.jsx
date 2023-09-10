import React, { useState } from "react";
import { ColorExtractor } from 'react-color-extractor';

export default function Card ({game}) {
  const linkToGame = `/gameInfo/?id=${game.steam_appid}`

  const [colours, setColours] = useState([]);

  const handleColors = (colors) => {
    setColours(colors)
  };

  return (
    <div className="group relative">
      <div className="group-hover:scale-110">
      <div className="  w-full overflow-hidden rounded-md lg:aspect-none">
      <ColorExtractor getColors={handleColors} >
        <img
          src={game.header_image}
          alt={"game image"}
          className="h-full w-full object-cover object-center"
        />
      </ColorExtractor>
      </div>
      {/* <div className="mt-1 p-4 rounded-md flex justify-between opacity-0 group-hover:opacity-100" style={{ backgroundColor: `${colours[0]}` }}> */}
        <div>
          <h3 className="text-sm text-outline-2 text-zinc-50 text-center">
            <a href={linkToGame}>
              <span aria-hidden="true" className="absolute inset-0" />
            </a>
          </h3>
        </div>
      </div>
      </div>
  )};