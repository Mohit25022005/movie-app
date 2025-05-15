import MoviesList from "@/components/MoviesList";

export interface Movies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default async function Home() {
 const apiKey = process.env.TMDB_API_KEY;

const endpoints = {
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`,
  top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=1`,
  latest: `https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}`,
};


  try {
    const results = await Promise.all(
      Object.entries(endpoints).map(async ([title, url]) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${title}`);
        const data = await res.json();
        return { title, movies: data.results as Movies[] };
      })
    );

    return (
      <main className="space-y-10 px-4 py-6">
        {results.map(({ title, movies }) => (
          <MoviesList key={title} title={title} movies={movies} />
        ))}
      </main>
    );
  } catch (error) {
    console.error("Error loading sections:", error);
    return <div>Failed to load movie sections.</div>;
  }
}
