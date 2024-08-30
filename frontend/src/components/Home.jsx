import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import './Home.css';
import logo from '../images/logo.png';
import Modal from 'react-modal';
import NavBar from './NavBar';
import { createRoom } from '../services/rooms';
import { getToken } from '../utils/securities';

Modal.setAppElement('#root'); // this line is needed for accessibility reasons

function Home() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIsLoggedIn(true);
      setUserEmail(payload.email);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    history.push('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();
    if (!token) {
      console.log('No token found. Redirecting to login.');
      history.push('/login');
      return;
    }

    const roomUUID = uuidv4();
  
    try {
      const response = await createRoom({ id: roomUUID });
      console.log(response);
      history.push(`/chatroom/${roomUUID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const closeAllModals = () => {
    setIsInstructionsOpen(false);
    setIsAboutOpen(false);
  };

  const openInstructions = () => {
    closeAllModals();
    setIsInstructionsOpen(true);
  };

  const openAbout = () => {
    closeAllModals();
    setIsAboutOpen(true);
  };

  return (
    <div className="home-container">
      <NavBar 
        openInstructions={openInstructions} 
        openAbout={openAbout} 
        userEmail={userEmail} 
        onLogout={handleLogout} 
      />

      <Modal
        isOpen={isInstructionsOpen}
        onRequestClose={closeAllModals}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <h2>Instructions</h2>
        <p>1. Create a chat room</p>
        <p>2. Share the chat room link with your friends</p>
        <p>3. Chat away!</p>
      </Modal>

      <Modal
        isOpen={isAboutOpen}
        onRequestClose={closeAllModals}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <h2>About</h2>
        <p>This is a simple chat application built using React, Node.js, and Socket.IO.</p>
      </Modal>

      <img src={logo} alt="Logo" className="logo" />
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <button type="submit" className="create-room-button">Create Room</button>
        </form>
      ) : (
        <div className="auth-buttons">
          <button onClick={() => history.push('/login')} className="login-button">Log In</button>
          <button onClick={() => history.push('/signup')} className="signup-button">Create Account</button>
        </div>
      )}
    </div>
  );
}

export default Home;