import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { io } from 'socket.io-client'; // import socket.io client
import { generateAnimalName, generateAvatar } from '../utils/users';
import { createUser, getUserDetails } from '../services/users';
import { joinRoom, leaveRoom, getRoomDetails } from '../services/rooms'; // moved joinRoom to server-side
import { getMessages, saveMessage } from '../services/messages';
import { getUserPresence } from '../services/userRooms';
import { timestamp } from '../utils/dates';
import { generateQRCode } from '../utils/qrCodes';
import Modal from 'react-modal';
import './Chatroom.css'; 

function Chatroom() {
  const { id } = useParams();
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');
  const [username, setUsername] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const [connectedUsers, setConnectedUsers] = React.useState([]);
  const [roomID, setRoomID] = React.useState(null);
  const [userID, setUserID] = React.useState(null);
  const [qrCode, setQRCode] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const socketRef = useRef(); // create a ref for the socket
  const isFirstRender = useRef(true);
  const messagesEndRef = useRef(null);

  const openModal = async () => {
    const url = `${window.location.origin}/chatroom/${id}`;
    const qrCodeDataURL = await generateQRCode(url);
    setQRCode(qrCodeDataURL);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      const username = generateAnimalName();
      const avatar = generateAvatar();
      setUsername(username);
      setAvatar(avatar);

      createUser(username, avatar)
        .then(_ => {
          // fetch user details
          getUserDetails(username)
            .then(userDetails => {
              // console.log('User details:', userDetails);
              setUserID(userDetails.id);
              // fetch room details
              getRoomDetails(id)
                .then(room => {
                  // console.log('Room details:', room);
                  setRoomID(room);
                  // fetch connected users
                  getUserPresence(room)
                    .then(response => {
                      setConnectedUsers(response);
                    })
                    .catch(error => console.error('Error fetching connected users:', error));
                })
                .catch(error => {
                  console.error('Error fetching room details:', error);
                });
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
            });
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });

      isFirstRender.current = false;
    }
  }, [id]); // id is a dependency because it's used in getRoomDetails

  useEffect(() => {
    if (roomID) {
      getMessages(roomID)
        .then(messages => {
          if (Array.isArray(messages)) {
            setMessages(oldMessages => [...messages, ...oldMessages]);
          } else {
            console.error('Unexpected response from getMessages:', messages);
          }
        })
        .catch(error => {
          console.error('Error retrieving messages:', error);
        });
    }
  }, [roomID]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() === '') return; // prevent sending empty messages
    const messageObject = { content: newMessage, userID: username, avatar: avatar, room: roomID };
    // console.log("Sending message:", messageObject); // debug log
    setNewMessage('');
    // console.log(roomID, username, avatar, newMessage);
    saveMessage(roomID, username, avatar, newMessage)
      .then(() => {
        socketRef.current.emit('send message', id, messageObject);
      })
      .catch(error => {
        console.error('Error saving message:', error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    if (!username) return;

    socketRef.current = io('https://temporary-chatrooms-backend.onrender.com'); // connect to the server
    socketRef.current.emit('join room', id, username, avatar); // join the room when the component mounts

    socketRef.current.on('error joining', (error) => {
      console.error('Error joining room:', error);
    });

    socketRef.current.on('user joined', (user) => {
      console.log('User joined:', user);
      console.log(`${user.username} joined the room`);
      setConnectedUsers((oldUsers) => [...oldUsers, user]); // add the new user to the connectedUsers state
      const joinMessage = { content: `${user.username} has joined the room.`, userID: 'System', id: id };
      setMessages((oldMessages) => [...oldMessages, joinMessage]); // add a new message to the chatroom
    });

    socketRef.current.on('user left', (user) => {
      console.log(`${user.username} left the room`);
      setConnectedUsers((oldUsers) => oldUsers.filter(oldUser => oldUser.username !== user.username)); // remove the user from the connectedUsers state
      const leaveMessage = { content: `${user.username} has left the room.`, userID: 'System', id: id };
      setMessages((oldMessages) => [...oldMessages, leaveMessage]); // add a new message to the chatroom
    });

    socketRef.current.on('receive message', (message) => { // listen for the 'receive message' event
      // console.log("Received message:", message); // debug log
      setMessages((oldMessages) => [...oldMessages, message]);
    });

    return () => {
      leaveRoom(id, username) // call leaveRoom when the component unmounts
        .then(result => {
          console.log('User left room:', result);
        })
        .catch(error => {
          console.error('Error leaving room:', error);
        });

      socketRef.current.off('join room'); // remove the 'join room' event listener
      socketRef.current.off('user joined'); // remove the 'user joined' event listener
      socketRef.current.off('user left'); // remove the 'user left' event listener
      socketRef.current.off('receive message'); // remove the 'receive message' event listener

      socketRef.current.disconnect(); // disconnect when the component unmounts
    };
  }, [id, username]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chatroom-container">
      <div className="header-container">
        <span onClick={openModal} style={{ cursor: 'pointer' }}>invite</span>
      </div>
      <div className="chatroom-top">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-content">
              <p>
                {message.userID !== 'System' && <span className="timestamp">[{timestamp(message.createdAt)}]</span>}
                {message.userID !== 'System' && <img src={message.avatar} className="avatar" />}
                {message.userID === 'System' ? message.content :
                  `${message.userID}: ${message.content}`
                }
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatroom-bottom">
        <Textarea
          className = "textarea"
          placeholder="Type a message"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>
      <div className="chatroom-panel">
        <h2>Connected Users</h2>
        {connectedUsers.map((user, index) => {
          return (
            <div key={index} className="connected-user">
              <img src={user.avatar} className="avatar" />
              <p>{user.username}</p>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Invite via QR Code"
        className="modal"
        overlayClassName="overlay"
      >
        {qrCode && <img src={qrCode} alt="QR Code" />}
      </Modal>
    </div>
  );
}

export default Chatroom;
