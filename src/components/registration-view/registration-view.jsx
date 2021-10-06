import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegisterView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    props.onRegister(Username);
  };

  return (
    <form>
      <label>
        Username:
        <input type='text' value={Username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='password' value={Password} onChange={e => setPassword(e.target.value)} />

      </label>
      <label>
        Email:
        <input type='email' value={Email} onChange={e => setEmail(e.target.value)} />

      </label>
      <label>
        Birthday:
        <input type='date' value={Birthday} onChange={e => setBirthday(e.target.value)} />

      </label>
      <button type='submit' onClick={handleSubmit}>Register</button>
    </form>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func.isRequired
};