import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getChats } from '../APIs/utils';
import AuthContext from '../context/AuthContext';
import WebSocketInstance from '../Websokcets/websocket';
import '../CSS/chats.css'; // Import the styles for the chat component

const Chat = () => {
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState(userInfo.username);
  const [chats, setChats] = useState([]);
  const { chatId } = useParams(); 
  const chatLogContainerRef = useRef(null); // Create a ref for the chat log container

  useEffect(() => {
    WebSocketInstance.connect(chatId);
    WebSocketInstance.addCallback(handleNewMessages, handleNewMessage);
    WaitForSocketConnection(() => {
      console.log("SENDING " + chatId)
      WebSocketInstance.fetchMessage(username , chatId);
    });
    return () => {
      WebSocketInstance.disconnect();
      WebSocketInstance.callbacks = {};
    };
  }, [username]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats();
        setChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
  }, []);

  const handleNewMessages = messages => {
    setMessages(messages);
    scrollToBottom()
  };

  const handleNewMessage = message => {
    setMessages(prevMessages => [...prevMessages, message]);
    scrollToBottom()
  };

  const handleMessageSubmit = event => {
    event.preventDefault();
    const data = { message: messageInput, from: username };
    WebSocketInstance.newChatMessage(data , chatId);
    setMessageInput('');
  };

  const WaitForSocketConnection = callback => {
    const socket = WebSocketInstance.SocketRef;
    const recursion = WaitForSocketConnection;
    setTimeout(function() {
      if (socket != null && socket.readyState === 1) {
        console.log("WebSocket connection is secure");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        console.log("Waiting for WebSocket connection...");
        recursion(callback);
      }
    }, 100);
    console.log(chats[0]) 
  };

  const chatLogContainer = document.querySelector('.chat-log-container');

  function scrollToBottom() {
    chatLogContainerRef.current.scrollTop = chatLogContainerRef.current.scrollHeight;
  }

  return (
    <div  className="chat-container"> {/* Add a class to the chat container */}
      <div className="chat-sidebar"> {/* Add a sidebar for the chat list */}
        <h2>Chats</h2>
        <ul className="chat-list"> {/* Add a class to the chat list */}
          {chats.map(chat => (
            
            <li key={chat.id}>
              <a href={`/chat/${chat.id}`}>{chat.participant1.username} </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main"> {/* Add a main section for the chat log and message input */}
      <div className="chat-log-container" ref={chatLogContainerRef}> {/* Add the ref to the chat log container */}
  {messages.map((message, index) => (
    <div
      key={index}
      className={`chat-message`}
    >
      <div
      key={index}
      className={`chat-message ${message.author.username === username ? 'me' : 'participant'}`}
    >
      {message.message}

    </div>
    <br></br>
    </div>
  ))}
</div>
        <form className="message-form" onSubmit={handleMessageSubmit}> {/* Add a form for the message input */}
          <input
            id="chat-message-input"
            className="message-input"
            type="text"
            value={messageInput}
            onChange={event => setMessageInput(event.target.value)}
          />
          <button id="chat-message-submit" className="send-button" type="submit">Send</button> {/* Use a button instead of an input */}
        </form>
      </div>
    </div>
  );
};

export default Chat;