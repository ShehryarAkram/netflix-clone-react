import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function SingleMovie() {
  const [movie, setMovie] = useState();
    const {id}  = useParams();
  
    useEffect(()=>{
       console.log('THis is running')
      async function fetchMovie (){
        await axios.get( `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_IMDB_API_KEY}`).then((response) => {
          setMovie(response.data);
        });
      }
      fetchMovie();
    },[id])

    console.log({movie})

    return (
      <div className="w-full h-full text-white pt-20">
        {
          movie &&
          <>
        <div className="p-4 md:pt-8 flex flex-col md:flex-row max-w-6xl mx-auto md:mx-0 md:space-x-6">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              movie.backdrop_path || movie.poster_path
            }`}
            width={700}
            className="rounded-lg"
            style={{
              maxWidth: "100%",
              height: "100%",
            }}
            placeholder="blur"
            blurDataURL="/spinner.svg"
            alt="Movie poster"
          ></img>
          <div className="p-2">
            <h2 className="text-lg mb-3 font-bold">
              {movie.title || movie.name}
            </h2>
            <p className="text-lg mb-3">
              <span className="font-semibold mr-1">Overview:</span>
              {movie.overview}
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1">Date Released:</span>
              {movie.release_date || movie.first_air_date}
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1">Rating:</span>
              {movie.vote_count}
            </p>
          </div>
        </div>
          </>

        }
        
      </div>
    );
  }

export default SingleMovie;