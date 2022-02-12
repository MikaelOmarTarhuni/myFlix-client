import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MovieCard } from '../movie-card/movie-card';


export class DirectorView extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    const { movies, director, onBackClick } = this.props;

    return (
      <div key={director.props}>
        <Card className="director-view m-3">
          <Card.Body>
              <Card.Title>
              <span className="value">{director.Name}</span>
              </Card.Title>
            <Card.Text className="director-birthday">
              <span>Born in: </span>
              <span className="value">{director.Birth}</span>
            </Card.Text>
            <Card.Text className="director-bio">
              <span>Biography: </span>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>
          <h4 className="mt-3">Some {director.Name} movies</h4><hr />
          {movies.map((m) => {
          if (m.Director.Name === director.Name) {
            return (
              <div style={{ width: '15rem', float: 'left' }} className="d-inline-flex align-content-start m-1" key={m._id}>
                <MovieCard movie={m} />
              </div>
            )
          }
        })}
      </div>
      
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }),
  onBackClick: PropTypes.func.isRequired
};