// app/upcoming/page.tsx
import MoviesList from "@/components/MoviesList";
import { Movies } from "@/types";

export default async function UpcomingPage() {
  try {
    const res = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=1");

    if (!res.ok) throw new Error("Failed to fetch upcoming movies");

    const data = await res.json();
    const movies: Movies[] = data.results;

    return <MoviesList title="Upcoming Bangers" movies={movies} />;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return <div>Failed to load upcoming movies.</div>;
  }
}
