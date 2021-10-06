import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Row } from 'react-bootstrap';

export class MainView extends React.Component{

    constructor() {
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          ogin: true,
          register: false
        }
      }
      
      componentDidMount(){
          axios.get('https://myflixdb-mikael.herokuapp.com/movies')
          .then(response => {
              this.setState({
                  movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
      }
      
      setSelectedMovie(movie) {
          this.setState({
              selectedMovie: movie
            });
     }

     onRegister(user) {
        this.setState({
            user: user
        });
        console.log(user);
        this.setRegPrompt(false);
      }    

     onLoggedIn(user) {
        this.setState({
          user
        });
        this.setLoginPrompt(false);
     }

     onLoggedOut(){
        this.setState({
          user:null
        });
      }

      setRegPrompt(active) {
        this.setState({
          register: active
        });
      }


    render() {
        const { movies, selectedMovie, user, login, register } = this.state;

        if (login) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} goToReg={() =>{this.setRegPrompt(true); this.setLoginPrompt(false);}}/>;

        if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
              {user
                ? <div> {user} <button onClick = {() => this.onLoggedOut()}>Log out</button></div>
                : <button onClick = {() => this.setLoginPrompt(true)}>Log in or register</button>
              }

              {selectedMovie
                ? (
                  <Row className="justify-content-md-center">
                    <col md={8}>
                      <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    </col>
                  </Row>
                )
                : (
                  <Row className="justify-content-md-center">
                    {movies.map(movie => (
                      <col md={3}>
                        <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                      </col>
                    ))}
                  </Row>
                )
            }
          </div>
        );
    }
}

export default MainView;