import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addFavorite, removeFavorite } from "../app/favoriteSlice";
import { useAppSelector, useGetMovieDetail } from "../app/hooks";
import { Comment } from "../components/Comment";
import { formatDate } from "../utils";

const MovieDetailLoading = () => {
  return (
    <div className="xs3:block sm:flex gap-4">
      <div className="bg-blue-400 w-96 h-96 rounded-sm flex-1"></div>
      <div className="bg-white rounded-sm p-4 flex-1">
        <div className="bg-blue-400 h-7 mt-2"></div>
        <div className="bg-blue-400 h-5 mt-2"></div>
        <div className="bg-blue-400 h-6 mt-2"></div>
        <div className="bg-blue-400 h-56 mt-2"></div>
      </div>
    </div>
  );
}

const MovieDetail = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const { data: config, loading: loadingConfig, error: errorConfig } = useAppSelector((state) => state.config);
  const { data, loading, error } = useGetMovieDetail(`https://api.themoviedb.org/3/movie/${movieId}`, {
    api_key: process.env.REACT_APP_TMDB_API_KEY || '',
  });
  const { favorites } = useAppSelector((state) => state.favorite);
  const isFavorite = favorites[movieId as string] !== null && favorites[movieId as string] !== undefined;

  const handleFavorite = () => {
    if (isFavorite && movieId) {
      dispatch(removeFavorite(movieId));
    } else {
      dispatch(addFavorite(data));
    }
  }

  return (
    <main className="mt-6">
      {loading && <MovieDetailLoading />}
      {(!loading && !error) && (
        <div>
          <div className="xs3:block sm:flex gap-4">
            <div className="bg-blue-400 xs3:w-full w-96 h-96 rounded-sm flex-1">
              {(loadingConfig && errorConfig) || <img className="object-cover w-full h-full" src={`${config.images.secure_base_url}${config.images.backdrop_sizes[1]}${data.backdrop_path}`} alt={data.title}/>}
            </div>
            <div className="bg-white rounded-sm p-4 flex flex-col flex-1">
              <div className="font-semibold text-xl text-blue-400 line-clamp-3">{data.title}</div>
              <div className="text-sm font-semibold">{formatDate(data.release_date)}</div>
              <div className="flex flex-wrap">{data.genres?.map((genre) => (
                <span className="font-semibold" key={genre.id}>{genre.name}&nbsp;</span>
              ))}</div>
              <div className="whitespace-normal break-words">{data.overview}</div>
              <div className="flex items-center justify-end mt-auto">
                <button onClick={handleFavorite} className="bottom-4 right-4 bg-white w-10 h-10 rounded-full  shadow-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isFavorite ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <Comment />
        </div>
      )}
      {error && <div className="text-red-500 font-semibold text-lg">{error}</div>}
    </main>
  )
}

export default MovieDetail;
