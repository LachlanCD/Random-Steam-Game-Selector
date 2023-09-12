import React from "react";
import { Link } from "react-router-dom";

export default function Card ({game}) {
  const linkToGame = `/gameInfo/?id=${game.steam_appid}`


  return (
    <div className="group relative">
      <div className="group-hover:scale-110">
      <div className="  w-full overflow-hidden rounded-md lg:aspect-none">
        <img
          src={game.header_image}
          alt={"game image"}
          className="h-full w-full object-cover object-center"
        />
      </div>
        <div>
          <h3 className="text-sm text-outline-2 text-zinc-50 text-center">
            <Link to={linkToGame}>
              <span aria-hidden="true" className="absolute inset-0" />
            </Link>
          </h3>
        </div>
      </div>
      </div>
  )};