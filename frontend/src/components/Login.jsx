import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginDetails, loginAccount } from '../services/accounts';
import { hashDataWithSaltRounds, storeToken } from '../utils/securities';
import './Login.css';

export default function Login() {
  const [formState, setFormState] = useState({});
  const history = useHistory();

  function handleChange(evt) {
    const currForm = { ...formState, [evt.target.name]: evt.target.value };
    setFormState(currForm);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;

      // get account salt and iterations from database
      const loginDetails = await getLoginDetails(formData.email);
      const hashedPassword = hashDataWithSaltRounds(formData.password, loginDetails.salt, loginDetails.iterations);
      formData.password = hashedPassword;

      // log in account
      const token = await loginAccount(formData);

      // store token in local storage
      storeToken(token);

      // redirect to home after successful login
      console.log('Login successful');
      history.push(`/`);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formState.email || ''}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formState.password || ''}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="error-message">&nbsp;</p>
    </div>
  );
}