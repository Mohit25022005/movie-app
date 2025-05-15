// app/top-rated/page.tsx
import MoviesList from "@/components/MoviesList";
import { Movies } from "@/types";

export default async function TopRatedPage() {
  try {
    const res = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=1");

    if (!res.ok) throw new Error("Failed to fetch top rated movies");

    const data = await res.json();
    const movies: Movies[] = data.results;

    return <MoviesList title="Top Rated Movies" movies={movies} />;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return <div>Failed to load top rated movies.</div>;
  }
}
