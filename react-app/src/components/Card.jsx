import React, { useState } from "react";
import { ColorExtractor } from 'react-color-extractor';

export default function Card ({game, setBackground}) {
  const linkToGame = `/gameInfo/?id=${game.steam_appid}`

  const [colours, setColours] = useState([]);

  const handleColors = (colors) => {
    setColours(colors)
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:scale-110">
      <ColorExtractor getColors={handleColors} >
        <img
          src={game.header_image}
          alt={"game image"}
          className="h-full w-full object-cover object-center"
        />
      </ColorExtractor>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-zinc-200 text-center">
            <a href={linkToGame} onMouseEnter={() => setBackground(colours[0])} onMouseLeave={() => setBackground("#3f3f46")}>
              <span aria-hidden="true" className="absolute inset-0" />
              
            </a>
          </h3>
        </div>
      </div>
    </div>
  )};