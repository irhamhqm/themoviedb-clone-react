
import { FormEvent, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { clearSearchResult, getSearchResultAsync } from "../app/searchResultSlice";

const Layout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchbar = location.pathname === '/';
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput) return;
    setSearchParams({ query: searchInput });
  }

  useEffect(() => {
    const query = searchParams.get('query');
    
    if (query) {
      dispatch(getSearchResultAsync(query));
      setSearchInput(query);
    } else {
      setSearchInput('');
      dispatch(clearSearchResult());
    }
  }, [dispatch, searchParams, location])

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="fixed z-10 top-0 left-0 w-full h-16 bg-white shadow-sm">
        <div className="flex xs3:justify-between sm:justify-start xs3:gap-2 gap-4 items-center px-4 mx-auto max-w-6xl h-full">
          <Link to="/"><div className={`text-blue-400 font-bold ${searchbar ? 'xs3:hidden' : 'xs3:block'} xs2:block`}>TMDB</div></Link>
          {searchbar ?
            <form className="flex gap-2 items-center" onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search movie"
                className="bg-blue-100 p-2 sm:w-80"
                value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="text-blue-300 font-semibold" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          : null}
          <Link to="/user" className="sm:ml-auto">
            <div className="rounded-full bg-blue-400 w-12 h-12 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        </div>
      </nav>
      <div className="xs3:pt-12 md:pt-16 xs3:px-2 md:px-6 mx-auto max-w-6xl min-h-container mb-8">
        <Outlet />
      </div>
      <footer className="mt-auto top-0 left-0 bg-blue-400 h-12 flex items-center justify-center text-white">
        <div className="leading-8">API by&nbsp;<a className="underline" href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">The Movie DB</a></div>
      </footer>
    </div>
  )
}

export default Layout;
