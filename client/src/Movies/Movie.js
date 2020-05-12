import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";


 function Movie ({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const [ updates, setUpdates ] = useState("")
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
       .then((res) => setMovie(res.data))
       .catch((err) => console.log(err.response));
      };

      const updateMovie = (e) => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${params.id}`, { ...movie, title: updates })
        .then(res => {
          console.log(res)
          setMovie(res.data)
        })
        .catch(err => console.log(err.response))
      }
    
      const deleteMovie = (e) => {
        e.preventDefault();
        axios
        .delete(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => {
          console.log(res)
          history.push("/")
          getMovieList()
        })
        .catch(err => console.log(err))
      }
    
      const saveMovie = () => {
       addToSavedList(movie);
      };

   useEffect(() => {
     fetchMovie(params.id);
   }, [params.id]);

   if (!movie) {
     return <div>Loading movie information...</div>;
   }
  
  return (
     <div className="save-wrapper">
       <MovieCard movie={movie} />

       <div className="save-button" onClick={saveMovie}>
        Save 
        </div>
    
        <form onSubmit={updateMovie}>
        <h2>Update movie title</h2>
        <input type="text" onChange={e => setUpdates(e.target.value)} value={updates}/>
        <button>Submit updates</button>
      </form>
      <form onSubmit={deleteMovie}>
        <h2>Delete Movie title</h2>
        <button>Delete Movie</button>
      </form>
    </div>
  );
}

 export default Movie;
