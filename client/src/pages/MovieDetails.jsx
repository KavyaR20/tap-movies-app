import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Alert, Card , Button} from 'react-bootstrap';
import axios from 'axios';
import Loader from '../components/Loader';

function MovieDetails() {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetchMovieDetails();
    },[])

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/movies/${movieId}`
            });
            setLoading(false);
            setDetails(response.data.movie);
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        
        <Card bg="dark" text="white"  style={{ width: '18rem' }} className="mx-auto"  >
             
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading ?
                <Loader />
                :
                <>
                    <Card.Header className="text-center"><h1>{details.title}</h1></Card.Header>
                    <Card.Body >
                        <Card.Img variant="top" src={details.poster} />
                        <p>Rating: {details.rating}</p>
                        <p>Language: {details.language}</p>
                        <p>Genre: {details.genre}</p>
                        <Button variant="success" onClick={() => history.goBack()}>Go Back </Button>
                    </Card.Body>

                </>
            }
        </Card>
    )
   
}

export default MovieDetails;