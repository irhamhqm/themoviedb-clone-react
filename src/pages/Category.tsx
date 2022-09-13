
import { useParams } from "react-router-dom";
import { useGetMovies } from "../app/hooks";
import { MovieItemLoading, MovieItem } from "../components/MovieItem";

const Category = () => {
  const { category = '' } = useParams();
  const { data, loading, error, fetchMore, fetchMoreLoading, fetchMoreError } = useGetMovies(`https://api.themoviedb.org/3/movie/${category}`, {
    api_key: process.env.REACT_APP_TMDB_API_KEY || ''
  });
  const placeholder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  
  return (
    <main className="mt-4">
      <div className="leading-8 h-8 flex items-center justify-between">
        <div className="text-xl font-semibold">{category.replace('_', ' ')} Movies</div>
      </div>
      {loading && (
      <div className="grid xs3:grid-cols-1 xs2:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-y-4">
        {placeholder.map((val) => (
          <MovieItemLoading key={val} />
        ))}
      </div>
      )}
      {(!loading && !!data.results.length) && (
        <div className="grid xs3:grid-cols-1 xs2:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-y-4">
          {data.results.map((movie) => (
            <MovieItem key={movie.id} movie={movie}/>
          ))}
          {fetchMoreLoading && (
            <MovieItemLoading />
          )}
        </div>
      )}
      {error && <div className="text-red-500 font-semibold text-lg mt-8">{error}</div>}
      {!fetchMoreError && <button className="bg-blue-400 text-white font-semibold text-lg px-4 py-2 rounded-sm mt-8" onClick={fetchMore}>See more</button>}
      {fetchMoreError && <div className="text-red-500 font-semibold text-lg mt-8">{fetchMoreError}</div>}
    </main>
  )
}

export default Category;
