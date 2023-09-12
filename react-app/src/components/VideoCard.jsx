import React from "react";

export default function Card ({content}) {

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
            <a href={linkToGame}>
              <span aria-hidden="true" className="absolute inset-0" />
            </a>
          </h3>
        </div>
      </div>
      </div>
  )};