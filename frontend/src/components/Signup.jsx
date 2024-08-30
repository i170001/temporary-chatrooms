import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../services/accounts';
import { hashData } from '../utils/securities';
import './Signup.css';

export default function Signup() {
  const [formState, setFormState] = useState({});
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  function handleChange(evt) {
    const currForm = { ...formState, [evt.target.name]: evt.target.value };
    setFormState(currForm);
    setDisable(checkPassword(currForm));
  }

  function checkPassword(currForm) {
    if (!currForm.password || !currForm.confirm) {
      return true;
    }
    if (currForm.password !== currForm.confirm) {
      return true;
    }
    return false;
  }

  function hashPassword() {
    const currForm = { ...formState };
    if (currForm.password) {
      const hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
    return currForm;
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = hashPassword();
      delete formData.confirm;
      const user = await signUp(formData);
      console.log('Signup successful:', user);
      history.push(`/`);
    } catch (error) {
      console.error('Signup failed:', error);
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
        <input
          type="password"
          name="confirm"
          value={formState.confirm || ''}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit" disabled={disable}>Signup</button>
      </form>
      <p className="error-message">&nbsp;</p>
    </div>
  );
}