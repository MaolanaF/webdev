import axios from 'axios';
import {useEffect, useState } from "react";

function Movie(){
  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [sutradara, setSutradara] = useState("");
  const [movies, setUsers] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);

    async function  Load(){
        const result = await axios.get(
            "http://127.0.0.1:8000/api/movies");
            setUsers(result.data);
            console.log(result.data);
    }  
 
    
     async function save(event){
        event.preventDefault();
    try
        {
         await axios.post("http://127.0.0.1:8000/api/save",
        {
        
          title: title,
          description: description,
          genre: genre,
          sutradara: sutradara
        
        });
          alert("Create Movie Successfully");
          setId("");
          setTitle("");
          setDescription("");
          setGenre("");
          setSutradara("");
          Load();
        
        }
    catch(err){
          alert("Movie Registation Failed");
        }
    }

    async function editMovie(movies){
        setTitle(movies.title);
        setDescription(movies.description);
        setGenre(movies.genre);
        setSutradara(movies.sutradara); 
        setId(movies.id);
    }



    async function DeleteMovie(id){
        await axios.delete("http://127.0.0.1:8000/api/delete/" + id); 
        alert("Movie deleted Successfully");
        Load();
    }



   async function update(event)
   {
    event.preventDefault();

   try
       {
        
        await axios.put("http://127.0.0.1:8000/api/update/"+ movies.find(u => u.id === id).id || id,
       {
         id: id,
         title: title,
         description: description,
         genre: genre,
         sutradara: sutradara
       
       });
         alert("Movie Updated");
         setId("");
         setTitle("");
         setDescription("");
         setGenre("");
         setSutradara("");
         Load();
       
       }
   catch(err)
       {
         alert("Create Movie Failed");
       }
  }

  return (
    <div>
       <h1>Movie Details</h1>
       <div class="container mt-4" >
          <form>
              <div class="form-group">
               <input  type="text" class="form-control" id="movie_id" hidden
               value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
               
               />
                <label>Movie Title</label>
                <input  type="text" class="form-control" id="title"
                value={title}
                onChange={(event) =>
                  {
                    setTitle(event.target.value);      
                  }}
                />
              </div>
              <div class="form-group">
                <label>Movie Description</label>
                <input  type="text" class="form-control" id="description" 
                 value={description}
                  onChange={(event) =>
                    {
                      setDescription(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>Genre</label>
                <input type="text" class="form-control" id="genre" 
                  value={genre}
                onChange={(event) =>
                  {
                    setGenre(event.target.value);      
                  }}
                />
              </div>

              <div class="form-group">
                <label>Sutradara</label>
                <input type="text" class="form-control" id="sutradara" 
                  value={sutradara}
                onChange={(event) =>
                  {
                    setSutradara(event.target.value);      
                  }}
                />
              </div>

                 <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>

<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Movie Id</th>
      <th scope="col">Movie Title</th>
      <th scope="col">Movie Description</th>
      <th scope="col">Movie Genre</th>
      <th scope="col">Movie Sutradara</th>

      <th scope="col">Option</th>
    </tr>
  </thead>
       {movies.map(function fn(movie)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{movie.id} </th>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.genre}</td>
                <td>{movie.sutradara}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editMovie(movie)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteMovie(movie.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
 
export default Movie;