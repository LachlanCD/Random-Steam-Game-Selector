import React from "react";

export default function VideoCard ({content}) {
  return (
    <div className="py-4">
    <div className="group relative max-w-[800px] border p-2 rounded-lg bg-slate-800 hover:scale-110">
      <div className="grid grid-cols-2">
        <div className="  w-full overflow-hidden rounded-md lg:aspect-none p-2">
          <img
            src={content.image}
            alt={"thumbnail"}
            className="h-[180px] w-full object-fill object-center"
          />
        </div>
        <div className="p-2">
          <a href={content.url}>
            <span aria-hidden="true" className="absolute inset-0" />
          </a>
          <p className="pb-2">{content.title}</p>
          <div className="grid grid-cols-2 text-[10px]">
            <p>{content.author}</p>
            <p>{content.publishedAt}</p>
          </div>
          <p className="text-[12px]">{content.description}</p>
        </div>
      </div>
    </div>
    </div>
  )};