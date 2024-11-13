import axios from "axios";
import { useState } from "react";
import config from "../lib/config";

export default function Home() {
  const values = {
    query: "",
  };
  const [formData, setFormData] = useState(values);
  const [movies, setMovies] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.tmdb.org/3/search/movie?query=${formData.query}&include_adult=false&language=en-US&page=1`,
        config,
      );

      const choices = res.data.results.map((result) => ({
        name: `${result?.title || result?.original_title} | ${result?.release_date?.split("-")[0]}`,
        value: result?.id,
      }));

      setMovies(choices);

      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <section>
      <article>
        <p className="font-semibold">Hey there,</p>
        <p>This is bingeflix, search and watch movies.</p>
      </article>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="query"
          placeholder="Search for a movie..."
          value={formData.query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul className="flex flex-col gap-2">
        {movies.length > 0
          ? movies.map((movie) => (
              <li key={movie?.value}>
                <a
                  href={`https://vidsrc.icu/embed/movie/${movie?.value}`}
                  target="_blank"
                >
                  {movie?.name}
                </a>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}
