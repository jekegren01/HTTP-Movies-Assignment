import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

 const AddMovie = props => {
    const initialMovieData = {
        title: "",
        director: "",
        metascore: "",
        stars: []
    }
    const [newMovie, setNewMovie] = useState(initialMovieData);
    const history  = useHistory();


    const onChange = e => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(newMovie);
        axios.post(`http://localhost:5000/api/movies`, newMovie)
        .then(({data})=>{
            setNewMovie(initialMovieData);
            history.push("/");
        }).catch(err=>{
            console.log(err);
        })
    }
    

    return (
        <div className="movie-list">
            <form onSubmit={onSubmit}>
                <h1>Add Movie</h1>
                <label htmlFor="title">
                    Title: <input onChange={onChange} type="text" name="title"/>
                </label>
                <label htmlFor="director">
                    Director: <input onChange={onChange} type="text" name="director"/>
                </label>
                <label htmlFor="metascore">
                    Metascore: <input onChange={onChange} type="text" maxLength="3" name="metascore"/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

 export default AddMovie; 