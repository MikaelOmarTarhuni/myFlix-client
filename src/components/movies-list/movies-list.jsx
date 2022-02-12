import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';


// extract visibilityFilter into a prop called visibilityFilter
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// MoviesList props contains two properties, movies and visibilityFilter
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  // pass the visibilityFilter prop to VisibilityFilterInput
  return <>
      <Col xs={12} className="mt-3">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
    {filteredMovies.map(m => (
      <Col className="m-2" sm={10} md={5} lg={4} xl={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>

    ))}
  </>;
}

// transforms the store into props that the MoviesList component will use
export default connect(mapStateToProps)(MoviesList);