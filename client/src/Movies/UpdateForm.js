import React from "react";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

 const UpdateForm = props => {
    const [updateData, setUpdateData] = useState({
        id: '',
        title: '',
        director: '',
        metascore: null,
        stars: []
    });
    const {id} = useParams();

    const onChange = e => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, updateData)
        .then(({data})=>{
            console.log(data);
        }).catch(err=>{
            console.log(err);
        });
    }


    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(({data})=>{
            setUpdateData({
                ...data
            })
        }).catch(err=>{
            console.log(err);
        });
    }, []);

     return (
         <div className="update-movie">
             <h1>Update Movie</h1>
             <form onSubmit={onSubmit}>
                 <label htmlFor="title">
                     Title: <input onChange={onChange} type="text" name="title" value={updateData.title}/>
                 </label>
                 <label htmlFor="title">
                     Director: <input onChange={onChange} type="text" name="director" value={updateData.director}/>
                 </label>
                 <label htmlFor="title">
                     Metascore: <input onChange={onChange} type="text" name="metascore" value={updateData.metascore}/>
                 </label>
                 <button>Submit</button>
             </form>
        </div>
     )
 }

 export default UpdateForm; 