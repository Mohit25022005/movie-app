// app/trending/page.tsx
import MoviesList from "@/components/MoviesList";
import { Movies } from "@/types";

export default async function TrendingPage() {
  try {
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=db75be3f6da59e6c54d0b9f568d19d16");

    if (!res.ok) throw new Error("Failed to fetch trending movies");

    const data = await res.json();
    const movies: Movies[] = data.results;

    return <MoviesList title="Trending Now" movies={movies} />;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return <div>Failed to load trending movies.</div>;
  }
}
