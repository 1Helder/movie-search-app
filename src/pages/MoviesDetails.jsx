import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const MoviesDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar filme");
      }
      const data = await response.json();
      setMovie(data);
    } catch (err) {
      setError("Erro ao carregar detalhes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}min`;
  };

  return (
    <div className="text-white min-h-screen">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="p-10 text-red-500">{error}</p>
      ) : (
        movie && (
          <div>
            {/* Backdrop */}
            <div className="w-full h-[300px] md:h-[400px]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Content */}
            <div className="wrapper px-5 py-10">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Poster */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full max-w-[300px] rounded-lg shadow-lg"
                />

                {/* Info */}
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {movie.title}
                  </h1>

                  <p className=" text-gray-400">{movie.release_date}</p>

                  <p className=" text-yellow-400 font-semibold">
                    ⭐{" "}
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </p>

                  <p className="text-base md:text-lg leading-relaxed">
                    {movie.overview}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-[#1f1f1f] text-gray-300 text-sm px-3 py-1 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300">
                    ⏱️{formatRuntime(movie.runtime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MoviesDetails;
