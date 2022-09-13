
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { MovieType } from "../pages/Main";
import { formatDate } from "../utils";

type MovieItemProps = {
  movie: MovieType
}

const MovieItemLoading = () => {
  return (
    <div className="w-40 h-80 bg-white shadow-sm rounded-sm">
      <div className="bg-blue-400 w-40 h-48"></div>
      <div className="p-2">
        <div className="h-6 bg-blue-400 mb-2"></div>
        <div className="h-6 bg-blue-400"></div>
      </div>
    </div>
  )
}

const MovieItem = (props: MovieItemProps) => {
  const { data: config, loading, error } = useAppSelector((state) => state.config);
  const { movie } = props;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="w-40 h-80 bg-white shadow-sm rounded-sm">
        <div className="bg-blue-400 relative">
        {(loading || error || !movie.backdrop_path) ? (<div className="w-40 h-48"></div>) : (<img className="object-cover w-40 h-48" src={`${config.images.secure_base_url}${config.images.backdrop_sizes[0]}${movie.backdrop_path}`} alt="movie poster"/>)}
        </div>
        <div className="p-2">
          <div className="font-semibold line-clamp-3">{movie.title}</div>
          <div>{movie.release_date ? formatDate(movie.release_date) : ''}</div>
        </div>
      </div>
    </Link>
  )
}

export { MovieItem, MovieItemLoading };
