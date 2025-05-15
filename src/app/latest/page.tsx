// app/latest/page.tsx
import MoviesList from "@/components/MoviesList";
import { Movies } from "@/types";

export default async function LatestPage() {
  try {
    const res = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=1");

    if (!res.ok) throw new Error("Failed to fetch latest movies");

    const data = await res.json();
    const movies: Movies[] = data.results;

    return <MoviesList title="Now Playing" movies={movies} />;
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    return <div>Failed to load latest movies.</div>;
  }
}
