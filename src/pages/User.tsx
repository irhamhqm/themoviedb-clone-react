import { useMemo } from "react";
import compareDesc from 'date-fns/compareDesc';

import { useAppSelector } from "../app/hooks";
import { MovieItem } from "../components/MovieItem";

const User = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  const favoritesArr = useMemo(() => (Object.values(favorites)).sort((a, b) => compareDesc(a.dateAdded, b.dateAdded) ), [favorites]);

  return (
    <main className="mt-4">
      <div className="leading-8 text-xl font-semibold">
        {favoritesArr.length > 1 ? 'Favorites' : 'Favorite'}
      </div>
      {favoritesArr.length ? 
        (<div className="grid xs3:grid-cols-1 xs2:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-y-4">
          {favoritesArr.map((fav) => (
            <MovieItem key={fav.id} movie={fav} />
          ))}
        </div>) :
        (<div>You haven't favorited any movie yet.</div>)
      }
    </main>
  )
}

export default User;