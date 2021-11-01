import { useState, useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchMovies();
    },[]);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axios(`http://localhost:4000/api/movies?searchText=${searchText}`);
            setLoading(false);
            setMovies(response.data);
            setError(null);
        }
        catch (e) {
            setLoading(false);
            setError(`Server Error: ${e.message} ${e.stack}`);
        }
    }

    const onClickViewMovie = ({ id }) => {
        history.push(`/${id}`);
    }

    return (
        <>
            <SearchBar onClickRefresh={fetchMovies} setSearchText={setSearchText} />
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ?
                <Loader />
                : <div className="d-flex flex-wrap justify-content-start">
                    {movies.map(movie => {
                        const { title, id, poster} = movie;

                        return (
                            <Card key={id} className="m-3 movie-card" bg="dark" text="white">
                                <Card.Body >
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Img variant="top" src={poster} style={{  display: "block", margin: "auto",
                                     width: "100%", height:"50%"}}/>
                                    <Card.Text>
                                        To View Extra Details Click Below
                                    </Card.Text>
                                   <center> <Button
                                        variant="primary"
                                        onClick={() => onClickViewMovie(movie)}>
                                        View Movie
                                    </Button></center>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Home;