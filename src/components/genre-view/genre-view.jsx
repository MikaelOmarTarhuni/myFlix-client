import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { MovieCard } from '../movie-card/movie-card'

export class GenreView extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    const { movies, genre, onBackClick } = this.props;

    return (
      <div key={genre.props}>
      <Card className="genre-view m-3">
        <Card.Body>
            <Card.Title>
            <span className="value">{genre.Name}</span>
            </Card.Title>
          <Card.Text className="genre-discription">
            <span className="value">{genre.Description}</span>
          </Card.Text>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
          <h4 className="mt-4">Some {genre.Name} movies</h4><hr />
        {movies.map((m) => {
          if (m.Genre.Name === genre.Name) {
            return (
              <div style={{ width: '15rem'}} className="d-inline-flex align-content-start m-1" key={m._id}>
                <MovieCard movie={m} />
              </div>
            )
          }
        })}
      </div> 
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired
};