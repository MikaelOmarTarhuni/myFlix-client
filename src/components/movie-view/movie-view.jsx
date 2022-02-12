import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";


import { Link } from 'react-router-dom';
import axios from 'axios';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.addFavorite(accessToken);
  }

    addFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://myflixdb-mikael.herokuapp.com/users/${username}/movies/:MovieIDS${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFavorites(token) {
    const username = localStorage.getItem('user');
    const FavoriteMovies = this.state;

    axios.get(`https://myflixdb-mikael.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios.delete(`https://myflixdb-mikael.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render () {
    const { movie, onBackClick } = this.props;
    const { FavoriteMovies } = this.state;

    return (
      <div className="justify-content-center">
      <Col>
      <Card className="movie-view mt-3">
        <div>
          <Card.Img className="poster m-3" src={movie.ImagePath} />
        </div>
        <Card.Body>
          <span className="label">Title: </span>
          <Card.Title className="movie-title">
            <span className="value mx-2">{movie.Title}</span>
          </Card.Title>
          <span className="label">Description: </span>
          <Card.Text className="movie-description ml-2 w-75">
            <span className="value">{movie.Description}</span>
          </Card.Text>
          <span className="label">Directed by: </span>
          <Card.Text className="movie-director ml-2">
            {movie.Director.Name}
          </Card.Text>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="info" className="mr-1 mt-1">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="info" className="mr-1 mt-1">Genre</Button>
          </Link>
          <Button variant="danger" className="mr-1 mt-1" onClick={() => { this.addFavorite(movie); }}>Favorite</Button>
          <Button variant="secondary" className="mr-1 mt-1" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      </Col>
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
  }).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
      })
    )
  })
};

export default MovieView;