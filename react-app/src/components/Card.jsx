import React from "react";
import { Link } from 'react-router-dom';


export default function Card ({game}) {
  const linkToGame = `/gameInfo/?id=${game.steam_appid}`

  return (
          <Link to={linkToGame} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
              <img
                src={game.header_image}
                alt={"game image"}
                className="h-48 w-100 object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{game.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{game.short_description}</p>
          </Link>
  )};