# Temporary Chatrooms

*Temporary chatrooms for temporary groups.*

## Overview

Temporary Chatrooms is a web application designed to facilitate quick and anonymous communication for temporary groups. Whether you're at a seminar, a conference, a team-building event, or an excursion, this app allows you to easily create a chatroom or join one without any hassle. No sign-up or log-in is required, ensuring a fast and seamless experience.

## Features

- **Quick Setup:** Create a chatroom in seconds.
- **Anonymous Interaction:** No personal information is required to join or set up a chatroom.
- **Real-time Communication:** Built using WebSockets for instant messaging.
- **No Registration Needed:** Start chatting without any sign-up or log-in process.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **WebSocket:** Socket.io
- **Database:** MongoDB

## Data Entities

The application uses the following data entities:

- **Accounts:** Stores account details for managing chatroom access.
- **Messages:** Stores messages sent in chatrooms.
- **Rooms:** Represents the chatrooms created by users.
- **UserRooms:** Manages the relationship between users and the rooms they have joined.
- **Users:** Represents anonymous users participating in the chatrooms.
