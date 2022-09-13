import { Link, useSearchParams } from "react-router-dom";
import { useAppSelector, useGetMovies } from "../app/hooks";
import { MovieItem, MovieItemLoading } from "../components/MovieItem";

export interface MovieType {
  id: number,
  release_date: string,
  backdrop_path: string,
  title: string,
  overview: string,
  genres: Array<{ id: number, name: string }>
}

type MovieSectionProps = {
  title: string,
  category?: string,
  data: {
    results?: Array<MovieType>
  },
  loading: boolean,
  error: string,
  isSearchResult?: boolean
}

const MovieSection = (props: MovieSectionProps) => {
  const { title, category, data, loading, error, isSearchResult = false } =  props;
  const placeholder = [1, 2, 3, 4, 5, 6, 7, 8];
  
  return (
    <section className="mt-4">
      <div className="leading-8 flex items-center justify-between">
        <div className="text-xl font-semibold">{title}</div>
        {isSearchResult || <Link to={`category/${category}`}><div className="text-blue-400 font-semibold">See more</div></Link>}
      </div>
      {loading && (
        <div className="grid xs3:grid-cols-1 xs2:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-y-4">
          {placeholder.map((val) => (
            <MovieItemLoading key={val} />
          ))}
        </div>
      )}
      {(!loading && !error) && (isSearchResult && !data.results?.length) ? (
        <div>No movie found.</div>
      ) : (
        <div className="grid xs3:grid-cols-1 xs2:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4 gap-y-4">
          {data.results?.slice(0, 8).map((movie) => (
            <MovieItem key={movie.id} movie={movie}/>
          ))}
        </div>
      )}
      {error && <div className="text-red-500 font-semibold text-lg mt-8">{error}</div>}
    </section>
  )
}

const Main = () => {
  const { data: dataPopular, loading: loadingPopular, error: errorPopular } = useGetMovies('https://api.themoviedb.org/3/movie/popular', { api_key: process.env.REACT_APP_TMDB_API_KEY || '' });
  const { data: dataTop, loading: loadingTop, error: errorTop } = useGetMovies('https://api.themoviedb.org/3/movie/top_rated', { api_key: process.env.REACT_APP_TMDB_API_KEY || '' });
  const { data, loading, error } = useAppSelector((state) => state.searchResult);
  const [ searchParams ] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <main>
      {query && <MovieSection title={`Search Results for "${query}"`} data={data} loading={loading} error={error} isSearchResult={true} />}
      <MovieSection title="Popular Movies" category="popular" data={dataPopular} loading={loadingPopular} error={errorPopular}></MovieSection>
      <MovieSection title="Top Rated Movies" category="top_rated" data={dataTop} loading={loadingTop} error={errorTop}></MovieSection>
    </main>
  )
}

export default Main;