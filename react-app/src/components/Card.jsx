
export default function Card ({games}) {
    return (
      <div className="mx-auto px-15 py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1 xl:grid-cols-3 xl:gap-x-10">
          {games.map((game) => (
            <a key={game.steam_appid} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
                <img
                  src={game.header_image}
                  alt={"game image"}
                  className="h-48 w-100 object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{game.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{game.short_description}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }