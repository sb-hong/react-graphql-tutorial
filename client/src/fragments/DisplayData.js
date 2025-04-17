import './DisplayData.css';
import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';

const QUERY_ALL_USERS_AND_ALL_MOVIES = gql`
    fragment idAndName on User {
        id
        name
    }
    query GetAllUsersAndAllMovies {
        users {
            ...on UsersSuccess {
                result {
                    ...idAndName
                    username
                    age
                    nationality
                }
            }
            ...on CommonError {
                message
            }
        }
        movies {
            ...on MoviesSuccess {
                result {
                    id
                    name
                    yearOfPublish
                }
            }
            ...on CommonError {
                message
            }
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query GetMovie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublish
            isInTheaters
        }
    }
`;

const ADD_USER = gql`
    mutation AddUser($input: AddUserInput!) {
        addUser(input: $input) {
            id
            name
            age
        }
    }
`;

const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            username
        }
    }
`;

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`;

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState("");

    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    const [upid, upId] = useState("");
    const [upname, upName] = useState("");
    const [upusername, upUserName] = useState("");

    const [delid, delId] = useState("");

    const { data, loading, refetch, error } = useQuery(QUERY_ALL_USERS_AND_ALL_MOVIES);
    const [fetchMovie, {data: movieSearchDd, error: movieSearchErr}] = useLazyQuery(GET_MOVIE_BY_NAME);

    const [createUser] = useMutation(ADD_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);

    if (loading) {
        return (<h1>Data loading...</h1>);
    }

    if (error) {
        console.error(error);
    }

    return (
        <div className="DisplayData">
            <div>
                <input type="text" placeholder="Input name" onChange={(event) => { setName(event.target.value); }}/>
                <input type="text" placeholder="Input username" onChange={(event) => { setUserName(event.target.value); }}/>
                <input type="number" placeholder="Input age" onChange={(event) => { setAge(Number(event.target.value)); }}/>
                <input type="text" placeholder="Input nationality" onChange={(event) => { setNationality(event.target.value.toUpperCase()); }}/>
                <button onClick={() => {
                    createUser({
                        variables: { input: {name, username, age, nationality} }
                    });

                    refetch();
                }}>Add User</button>
            </div>
            <br/>
            
            <div>
                <input type="text" placeholder="ID" onChange={(event) => { upId(event.target.value); }}/>
                <input type="text" placeholder="Input name" onChange={(event) => { upName(event.target.value); }}/>
                <input type="text" placeholder="Input username" onChange={(event) => { upUserName(event.target.value); }}/>
                
                <button onClick={() => {
                    updateUser({
                        variables: { input: {id: upid, username: upusername, name: upname} }
                    });

                    refetch();
                }}>Update User</button>
            </div>

            <br/>
            <div>
                <input type="text" placeholder="ID" onChange={(event) => { delId(event.target.value); }}/>
                
                <button onClick={async () => {
                    let delUserResp = await deleteUser({
                        variables: { id: delid }
                    });

                    refetch();
                    
                    if (delUserResp.data.deleteUser) {
                        toast.success("Delete success!", { autoClose: 3000 });
                    } else {
                        toast.error("Delete failed", { autoClose: 3000 });
                    }
                }}>Delete User</button>
            </div>

            <br/>
            <h1 class="m-underline">LIST OF USERS</h1>
            {data && data.users.result && data.users.result.map((user) => {
                return (<div class="m-padding-bottom">
                    <h1>Name: {user.name}</h1>
                    <h1>Username: {user.username}</h1>
                    <h1>Age: {user.age}</h1>
                    <h1>Nationality: {user.nationality}</h1>
                </div>)
            })}
            {data && data.users.message && (
                <h2>{data.users.message}</h2>
            )}

            <br/>
            <h1 class="m-underline">MOVIE LIST</h1>
            {data && data.movies.result && data.movies.result.map((movie) => {
                return (<h1>Movie Name: {movie.name}</h1>)
            })}
            {data && data.movies.message && (
                <h2>{data.movies.message}</h2>
            )}

            <br/>
            <div>
                <input type="text" placeholder="Type movie name..." onChange={(event) => {
                    setMovieSearched(event.target.value);
                }}/>
                <button onClick={() => {
                    fetchMovie({variables: { name: movieSearched }});
                }}>Search</button>
                <div>
                    {movieSearchDd && movieSearchDd.movie && (
                        <div>
                            <h1>Movie Name: {movieSearchDd.movie.name}</h1>
                            <h1>Year of Published: {movieSearchDd.movie.yearOfPublish}</h1>
                            <h1>In Theater: {movieSearchDd.movie.isInTheaters ? 'Yes' : 'No'}</h1>
                        </div>
                    )}
                    {movieSearchDd && !movieSearchDd.movie && (
                        <h2>Movie not found</h2>
                    )}
                    {movieSearchErr && (
                        <h2>Movie not found</h2>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>

    );
}

export default DisplayData;